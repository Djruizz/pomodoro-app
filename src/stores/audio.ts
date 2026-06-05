import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAudioStore = defineStore('audio', () => {
  // 1. Estado global del audio
  const isPlaying = ref(false)
  const isMuted = ref(false)
  const volume = ref(0.5) // Rango de 0 a 1

  // Guardamos la referencia de la instancia de Audio de forma interna
  let audioInstance: HTMLAudioElement | null = null

  // 2. Inicializar el audio (útil llamarlo al montar la app)
  const initAudio = (audioUrl: string) => {
    if (typeof window !== 'undefined' && !audioInstance) {
      audioInstance = new Audio(audioUrl)
      audioInstance.volume = volume.value

      // Sincronizar eventos nativos con el estado reactivo de Pinia
      audioInstance.addEventListener('play', () => (isPlaying.value = true))
      audioInstance.addEventListener('pause', () => (isPlaying.value = false))
      audioInstance.addEventListener('ended', () => (isPlaying.value = false))
    }
  }

  // 3. Acciones para controlar la reproducción
  const play = () => {
    if (!audioInstance) return

    // Si terminó, lo reiniciamos al principio
    if (audioInstance.currentTime > 0 && audioInstance.ended) {
      audioInstance.currentTime = 0
    }

    audioInstance.play().catch((err) => {
      console.warn('Interacción del usuario requerida antes de reproducir audio:', err)
    })
  }

  const pause = () => {
    audioInstance?.pause()
  }

  const setVolume = (newVolume: number) => {
    const v = Math.max(0, Math.min(1, newVolume)) // Asegurar límites entre 0 y 1
    volume.value = v
    if (audioInstance) audioInstance.volume = isMuted.value ? 0 : v
  }

  const toggleMute = () => {
    isMuted.value = !isMuted.value
    if (audioInstance) {
      audioInstance.volume = isMuted.value ? 0 : volume.value
    }
  }
  const playSound = (audioUrl: string) => {
    if (isMuted.value) return

    const instance = new Audio(audioUrl)
    instance.volume = volume.value

    // El navegador lo reproduce en un canal nuevo automáticamente
    instance.play().catch((err) => console.warn(err))

    // Opcional: Limpieza automática del DOM cuando termine el sonido
    instance.addEventListener('ended', () => {
      instance.remove()
    })
  }

  // Bonus: Para efectos de sonido rápidos (ej. clicks de botones en cascada)
  // const playEffect = (effectUrl: string) => {
  //   if (isMuted.value) return
  //   const fx = new Audio(effectUrl)
  //   fx.volume = volume.value
  //   fx.play().catch(() => {})
  // }

  return {
    isPlaying,
    isMuted,
    volume,
    initAudio,
    play,
    pause,
    setVolume,
    toggleMute,
    playSound,
  }
})
