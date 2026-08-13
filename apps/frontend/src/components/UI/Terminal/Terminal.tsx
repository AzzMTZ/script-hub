import { useEffect, useRef } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { TerminalContainer } from './Terminal.styles';

interface TerminalProps {
    lines: string[];
}

const Terminal = ({ lines }: TerminalProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

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
            theme: {
                background: '#1e1e1e',
            },
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
    }, [lines]);

    return <TerminalContainer ref={containerRef} />;
};

export default Terminal;
