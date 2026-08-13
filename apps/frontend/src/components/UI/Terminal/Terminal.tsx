import { useContext, useEffect, useRef } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { ColorModeContext } from '../../../contexts/ColorModeContext';
import { TerminalContainer } from './Terminal.styles';

interface TerminalProps {
    lines: string[];
}

const terminalThemesByMode = {
    light: {
        background: '#ffffff',
        foreground: '#1e1e1e',
        cursor: '#1e1e1e',
    },
    dark: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        cursor: '#d4d4d4',
    },
};

const Terminal = ({ lines }: TerminalProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { mode } = useContext(ColorModeContext);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const terminal = new XTerm({
            convertEol: true,
            disableStdin: true,
            cursorBlink: false,
            fontSize: 13,
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            theme: terminalThemesByMode[mode],
        });
        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        terminal.open(containerRef.current);
        fitAddon.fit();

        lines.forEach((line) => terminal.writeln(line));

        const resizeObserver = new ResizeObserver(() => fitAddon.fit());
        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
            terminal.dispose();
        };
    }, [lines, mode]);

    return <TerminalContainer mode={mode} ref={containerRef} />;
};

export default Terminal;
