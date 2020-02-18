/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import { DualScreenInfoEvent, SpannedChangeHandler, WindowRect } from '../types';
import { EmitterSubscription, NativeEventEmitter, NativeModules } from "react-native";

export interface ExposedNativeMethods {
    getWindowRects: () => Promise<WindowRect[]>;
		isSpanned: () => Promise<boolean>;
}

interface IDualScreenInfoModule extends ExposedNativeMethods {
    isDualScreenDevice: boolean;
		hingeWidth: number;
    addEventListener: (
        type: DualScreenInfoEvent,
        handler: SpannedChangeHandler
    ) => void;
    removeEventListener: (
        type: DualScreenInfoEvent,
        handler: SpannedChangeHandler
    ) => void;
}

class RNDualScreenInfoModule implements IDualScreenInfoModule {
	private eventEmitter: NativeEventEmitter = new NativeEventEmitter(NativeModules.DualScreenInfo);

	addEventListener(type: DualScreenInfoEvent, handler: SpannedChangeHandler): EmitterSubscription {
		return this.eventEmitter.addListener(type, handler)
	}

	removeEventListener(type: DualScreenInfoEvent, handler: SpannedChangeHandler): void {
		this.eventEmitter.removeListener(type, handler)
	}

	get isDualScreenDevice(): boolean {
		return NativeModules.DualScreenInfo.isDualScreenDevice
	}

	get hingeWidth(): number {
		return NativeModules.DualScreenInfo.hingeWidth
	}

	isSpanned(): Promise<boolean> {
		return NativeModules.DualScreenInfo.isSpanned()
	}

	getWindowRects(): Promise<WindowRect[]> {
	    return NativeModules.DualScreenInfo.getWindowRects()
	};
}

export const DualScreenInfo = new RNDualScreenInfoModule();
