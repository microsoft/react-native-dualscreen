import { WindowRect } from "./types";

declare module 'react-native' {
	namespace NativeModules {
		export interface DualScreenInfo {
			isDualScreenDevice: boolean
			hingeWidth: number
			isSpanned: () => Promise<boolean>
			getWindowRects: () => Promise<WindowRect[]>
		}
	}
}
