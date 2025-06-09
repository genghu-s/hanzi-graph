import { useParams } from 'react-router-dom';
import { useHanziWriter } from "../configs/useHanziWriter";

import '../css/HanziWriterApp.css';

/**
 * Main supportor for handle functionality for writing
 */
const HanziWriter = () => {

    const { character } = useParams(); 

    const {
        refs: { demoRef, quizRef, freeWritingRef },
        states: { animationSpeed },
        handlers: {
        handleSpeedChange,
        handleAnimateDemo,
        handleStartQuiz,
        handleResetQuiz,
        handleClearFreeWriting
        }
    } = useHanziWriter(character === undefined? "" : character);

    return (
        <>
        <div className="hanzi-writer-app">
            <h1 data-en="Chinese Writing Practice">汉字书写练习：{character}</h1>
            
            <div className="writer-container">
                <div className="writer-section">
                <h2 data-en="Stroke Demonstration">笔画演示</h2>
                <div className="speed-control-container">
                    <div className="speed-control-vertical">
                    <div className="speed-label">速度</div>
                    <div className="slider-wrapper">
                        <input
                        type="range"
                        className="speed-slider-vertical"
                        min="0.1"
                        max="10"
                        step="0.1"
                        value={animationSpeed}
                        onChange={handleSpeedChange}
                        />
                        <div className="speed-value">{animationSpeed.toFixed(1)}x</div>
                    </div>
                    </div>
                    <div className="writer-canvas" ref={demoRef}></div>
                </div>
                <div className="writer-controls">
                    <button onClick={handleAnimateDemo} data-en="Replay">重新演示</button>
                </div>
                </div>
                
                <div className="writer-section">
                <h2 data-en="Stroke Quiz" className="quiz-title">笔画测验</h2>
                <div className="writer-canvas" ref={quizRef}></div>
                <div className="writer-controls">
                    <button onClick={handleStartQuiz} data-en="Start Quiz">开始测验</button>
                    <button onClick={handleResetQuiz} data-en="Reset">重置</button>
                </div>
                </div>
                
                <div className="writer-section">
                <h2 data-en="Free Writing">自由书写</h2>
                <div className="writer-canvas" ref={freeWritingRef}></div>
                <div className="writer-controls">
                    <button onClick={handleClearFreeWriting} data-en="Clear">清除</button>
                </div>
                </div>
            </div>
            </div>
        </>
    );

}

export default HanziWriter;