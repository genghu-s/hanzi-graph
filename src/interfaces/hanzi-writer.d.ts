declare module 'hanzi-writer' {
  interface HanziWriterOptions {
    width?: number;
    height?: number;
    padding?: number;
    showOutline?: boolean;
    showCharacter?: boolean;
    charDataLoader?: (char: string) => Promise<any>;
    onLoadCharDataError?: (error: Error) => void;
    onLoadCharDataSuccess?: () => void;
    strokeAnimationSpeed?: number;
    strokeFadeDuration?: number;
    strokeHighlightDuration?: number;
    strokeHighlightSpeed?: number;
    delayBetweenStrokes?: number;
    delayBetweenLoops?: number;
    drawingWidth?: number;
    drawingColor?: string;
    strokeColor?: string;
    outlineColor?: string;
    highlightColor?: string;
    rendererOverride?: Record<string, any>;
    gridColor?: string;
    showHintAfterMisses?: number;
    highlightOnComplete?: boolean;
    leniency?: number;
    showGrid?: boolean;
  }

  interface HanziWriterInterface {
    animateCharacter: () => Promise<void>;
    loopCharacterAnimation: () => Promise<void>;
    pauseAnimation: () => void;
    resumeAnimation: () => void;
    showCharacter: () => void;
    hideCharacter: () => void;
    showOutline: () => void;
    hideOutline: () => void;
    quiz: () => {
      startUserStroke: (x: number, y: number) => void;
      continueUserStroke: (x: number, y: number) => void;
      endUserStroke: () => void;
      cancel: () => void;
      isActive: () => boolean;
    };
    cancelQuiz: () => void;
    setCharacter: (character: string) => Promise<void>;
    getCharacter: () => string;
    destroy: () => void;
  }

  interface HanziWriterStatic {
    create: (element: string | HTMLElement, character: string, options?: HanziWriterOptions) => HanziWriterInterface;
    loadCharacterData: (character: string) => Promise<any>;
  }

  const HanziWriterInterface: HanziWriterStatic;
  export default HanziWriterInterface;
}