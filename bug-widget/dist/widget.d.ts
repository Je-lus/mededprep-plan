import { SessionTracker } from './session';
export declare function createWidget(project: string, apiUrl: string, sessionTracker: SessionTracker | null, position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left', zIndex: number): () => void;
