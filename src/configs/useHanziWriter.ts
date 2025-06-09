import HanziWriterInterface from 'hanzi-writer';
import { useEffect, useRef, useState, useCallback } from 'react';

// 常量配置
const WRITER_CONFIG = {
  width: 300,
  height: 300,
  padding: 5,
  strokeColor: '#333',
  outlineColor: '#ddd',
  highlightColor: '#0af',
  quizConfig: {
    showCharacter: false,
    showOutline: true,
    showHintAfterMisses: 3,
    highlightOnComplete: true,
    strokeHighlightSpeed: 1,
    drawingWidth: 4,
    drawingColor: '#333',
    leniency: 1.2
  }
};

// 绘制米字格的通用函数
const drawMiGrid = (canvas: HTMLCanvasElement, color: string = '#ddd'): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // 设置背景色
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 绘制米字格
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  
  // 外框
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  
  // 十字线
  ctx.beginPath();
  ctx.moveTo(10, canvas.height / 2);
  ctx.lineTo(canvas.width - 10, canvas.height / 2);
  ctx.moveTo(canvas.width / 2, 10);
  ctx.lineTo(canvas.width / 2, canvas.height - 10);
  ctx.stroke();
  
  // 对角线
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(canvas.width - 10, canvas.height - 10);
  ctx.moveTo(canvas.width - 10, 10);
  ctx.lineTo(10, canvas.height - 10);
  ctx.stroke();
};

// 创建带有米字格背景的HanziWriter实例
const createWriterWithGrid = (
  container: HTMLDivElement,
  character: string,
  options: any
) => {
  // 清空容器
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  // 创建背景canvas
  const bgCanvas = document.createElement('canvas');
  bgCanvas.width = WRITER_CONFIG.width;
  bgCanvas.height = WRITER_CONFIG.height;
  bgCanvas.className = 'grid-background';
  container.appendChild(bgCanvas);
  drawMiGrid(bgCanvas);
  
  // 创建书写区域
  const hanziDiv = document.createElement('div');
  hanziDiv.className = 'hanzi-writer-target';
  hanziDiv.style.position = 'absolute';
  hanziDiv.style.top = '0';
  hanziDiv.style.left = '0';
  hanziDiv.style.width = '100%';
  hanziDiv.style.height = '100%';
  container.appendChild(hanziDiv);
  container.style.position = 'relative';
  
  return HanziWriterInterface.create(hanziDiv, character, options);
};

export const useHanziWriter = (character: string) => {
  const demoRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);
  const freeWritingRef = useRef<HTMLDivElement>(null);
  
  interface HanziWriterInstance {
    animateCharacter: () => Promise<void>;
    destroy: () => void;
    quiz?: () => {
      startUserStroke: (x: number, y: number) => void;
      continueUserStroke: (x: number, y: number) => void;
      endUserStroke: () => void;
      cancel: () => void;
      isActive: () => boolean;
    };
    cancelQuiz?: () => void;
  }

  const [demoWriter, setDemoWriter] = useState<HanziWriterInstance | null>(null);
  const [quizWriter, setQuizWriter] = useState<HanziWriterInstance | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [strokeDelay, setStrokeDelay] = useState(1000);

  // 处理动画速度变化
  const handleSpeedChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseFloat(e.target.value);
    setAnimationSpeed(newSpeed);
    // 调整延迟计算以适应更大的速度范围
    setStrokeDelay(Math.max(100, 2000 / newSpeed));
  }, []);

  // 初始化所有书写模式
  useEffect(() => {
    if (!character) return;

    const cleanup = () => {
      if (demoWriter && typeof demoWriter.destroy === 'function') demoWriter.destroy();
      if (quizWriter && typeof quizWriter.destroy === 'function') quizWriter.destroy();
    };

    cleanup();

    // 创建演示模式
    if (demoRef.current) {
      const writer = createWriterWithGrid(demoRef.current, character, {
        ...WRITER_CONFIG,
        strokeAnimationSpeed: animationSpeed,
        delayBetweenStrokes: strokeDelay
      }) as HanziWriterInstance;
      setDemoWriter(writer);
      setTimeout(() => writer.animateCharacter(), 1000);
    }

    // 创建测验模式
    if (quizRef.current) {
      const writer = createWriterWithGrid(quizRef.current, character, {
        ...WRITER_CONFIG,
        ...WRITER_CONFIG.quizConfig
      }) as HanziWriterInstance;
      setQuizWriter(writer);
    }

    // 创建自由书写模式
    if (freeWritingRef.current) {
      while (freeWritingRef.current.firstChild) {
        freeWritingRef.current.removeChild(freeWritingRef.current.firstChild);
      }

      const canvas = document.createElement('canvas');
      canvas.width = WRITER_CONFIG.width;
      canvas.height = WRITER_CONFIG.height;
      freeWritingRef.current.appendChild(canvas);
      drawMiGrid(canvas);

      let isDrawing = false;
      let lastX = 0;
      let lastY = 0;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const startDrawing = (e: MouseEvent | TouchEvent): void => {
        e.preventDefault();
        isDrawing = true;
        const pos = getPosition(e);
        lastX = pos.x;
        lastY = pos.y;
      };

      const draw = (e: MouseEvent | TouchEvent): void => {
        e.preventDefault();
        if (!isDrawing || !ctx) return;
        
        const pos = getPosition(e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        lastX = pos.x;
        lastY = pos.y;
      };

      const stopDrawing = (): void => {
        isDrawing = false;
      };

      const getPosition = (e: MouseEvent | TouchEvent): { x: number; y: number } => {
        const rect = canvas.getBoundingClientRect();
        const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
        const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
        return { x, y };
      };

      // 添加事件监听器
      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', stopDrawing);
      canvas.addEventListener('mouseout', stopDrawing);
      canvas.addEventListener('touchstart', startDrawing);
      canvas.addEventListener('touchmove', draw);
      canvas.addEventListener('touchend', stopDrawing);

      return () => {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mouseout', stopDrawing);
        canvas.removeEventListener('touchstart', startDrawing);
        canvas.removeEventListener('touchmove', draw);
        canvas.removeEventListener('touchend', stopDrawing);
      };
    }

    return cleanup;
  }, [character, animationSpeed, strokeDelay]);

  // 控制函数
  const handleAnimateDemo = useCallback(() => {
    if (demoWriter) demoWriter.animateCharacter();
  }, [demoWriter]);

  const handleStartQuiz = useCallback(() => {
    if (quizWriter && quizWriter.quiz) quizWriter.quiz();
  }, [quizWriter]);

  const handleResetQuiz = useCallback(() => {
    if (quizWriter && quizWriter.cancelQuiz) quizWriter.cancelQuiz();
  }, [quizWriter]);
  const handleClearFreeWriting = useCallback(() => {
    const canvas = freeWritingRef.current?.querySelector('canvas');
    if (canvas) drawMiGrid(canvas);
  }, []);

  return {
    refs: { demoRef, quizRef, freeWritingRef },
    states: { animationSpeed },
    handlers: {
      handleSpeedChange,
      handleAnimateDemo,
      handleStartQuiz,
      handleResetQuiz,
      handleClearFreeWriting
    }
  };
};