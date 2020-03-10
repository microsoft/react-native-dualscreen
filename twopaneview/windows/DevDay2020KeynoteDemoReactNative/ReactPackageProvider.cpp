#include "pch.h"
#include "ReactPackageProvider.h"

#include "NativeModules.h"
#include <CustomUserControlViewManager.h>


using namespace winrt::Microsoft::ReactNative;

namespace winrt::DevDay2020KeynoteDemoReactNative::implementation
{

void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept
{
    AddAttributedModules(packageBuilder);
    packageBuilder.AddViewManager(
        L"CustomUserControlViewManager", []() { return winrt::make<winrt::DevDay2020KeynoteDemoReactNative::implementation::CustomUserControlViewManager>(); });
}

} // namespace winrt::DevDay2020KeynoteDemoReactNative::implementation


