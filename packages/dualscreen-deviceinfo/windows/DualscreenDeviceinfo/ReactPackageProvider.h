// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#pragma once
#include "pch.h"
#include "ReactPackageProvider.g.h"

#include <winrt/Microsoft.ReactNative.h>

using namespace winrt::Microsoft::ReactNative;

namespace winrt::DualscreenDeviceinfo::implementation {

struct ReactPackageProvider : ReactPackageProviderT<ReactPackageProvider> {
    ReactPackageProvider() = default;

    void CreatePackage(IReactPackageBuilder const& packageBuilder) noexcept;
};

}

namespace winrt::DualscreenDeviceinfo::factory_implementation {

struct ReactPackageProvider : ReactPackageProviderT<ReactPackageProvider, implementation::ReactPackageProvider> {};

}
