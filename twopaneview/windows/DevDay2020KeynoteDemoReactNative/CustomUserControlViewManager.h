#pragma once

#include "winrt/Microsoft.ReactNative.h"

namespace winrt::DevDay2020KeynoteDemoReactNative::implementation {

    struct CustomUserControlViewManager : winrt::implements<
        CustomUserControlViewManager,
        winrt::Microsoft::ReactNative::IViewManager,
        winrt::Microsoft::ReactNative::IViewManagerWithNativeProperties,
        winrt::Microsoft::ReactNative::IViewManagerWithCommands> {
    public:
        CustomUserControlViewManager() = default;

        // IViewManager
        winrt::hstring Name() noexcept;

        winrt::Windows::UI::Xaml::FrameworkElement CreateView() noexcept;

        void AddPin(winrt::Windows::UI::Xaml::Controls::Maps::MapControl& mapControl, int id, double lat, double lng);

        // IViewManagerWithNativeProperties
        winrt::Windows::Foundation::Collections::
            IMapView<winrt::hstring, winrt::Microsoft::ReactNative::ViewManagerPropertyType>
            NativeProps() noexcept;

        void UpdateProperties(
            winrt::Windows::UI::Xaml::FrameworkElement const& view,
            winrt::Windows::Foundation::Collections::IMapView<winrt::hstring, winrt::Windows::Foundation::IInspectable> const &propertyMap);

        // IViewManagerWithCommands
        winrt::Windows::Foundation::Collections::IMapView<winrt::hstring, int64_t> Commands() noexcept;

        void DispatchCommand(
            winrt::Windows::UI::Xaml::FrameworkElement const& view,
            int64_t commandId,
            winrt::Windows::Foundation::Collections::IVectorView<winrt::Windows::Foundation::IInspectable> commandArgs) noexcept;
    };

}