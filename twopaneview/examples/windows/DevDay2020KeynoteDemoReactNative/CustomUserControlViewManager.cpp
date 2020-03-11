#include "pch.h"
#include "CustomUserControlViewManager.h"

#include "JSValueReader.h"
#include "NativeModules.h"

using namespace winrt;
using namespace Microsoft::ReactNative;
using namespace Windows::Foundation;
using namespace Windows::Foundation::Collections;
using namespace Windows::Storage::Streams;

using namespace Windows::Devices::Geolocation;

using namespace Windows::UI::Xaml;
using namespace Windows::UI::Xaml::Media;
using namespace Windows::UI::Xaml::Controls;
using namespace Windows::UI::Xaml::Controls::Maps;
using namespace Windows::UI::Composition;
using namespace Windows::UI::Xaml::Hosting;

namespace winrt::DevDay2020KeynoteDemoReactNative::implementation {

    // IViewManager
    hstring CustomUserControlViewManager::Name() noexcept {
        return L"MapControl";
    }

    FrameworkElement CustomUserControlViewManager::CreateView() noexcept {
        auto mapControl = Windows::UI::Xaml::Controls::Maps::MapControl();
        mapControl.MapServiceToken(L"Zki0aV8vpjebkYbubg5Z~0KNPoku2Tfi5OaprudJ7uQ~AvtBZqULXlBbVghKOgGr5H_fLi9zBMaMVkQ8bj2tREtb1wBLOfs1VIqsg4vig0Vj");

        auto jsonString = L"{"
	        "\"elements\": {"
		        "\"water\": {"
			        "\"fillColor\": \"#D2D5D5\","
			        "\"labelColor\": \"#D2D5D5\""
		        "},"
                "\"park\": {"
                    "\"fillColor\": \"#E2E5E5\""
                "},"
                "\"neighborhood\": {"
                    "\"strokeColor\": \"#FFFFFF\","
                    "\"fillColor\": \"#FFFFFF\","
                    "\"labelColor\": \"#757B7B\","
                    "\"labelOutlineColor\": \"#00000000\""
                "},"
		        "\"transportation\": {"
                    "\"strokeColor\": \"#FFFFFF\","
			        "\"fillColor\": \"#FFFFFF\","
                    "\"labelColor\": \"#757B7B\","
                    "\"labelOutlineColor\": \"#00000000\""
		        "},"
                "\"sand\": {"
                    "\"fillColor\": \"#E2E5E5\""
                "},"
                "\"structure\": {"
                    "\"fillColor\": \"#EFF0F0\""
                "},"
                "\"stadium\": {"
                    "\"fillColor\": \"#EFF0F0\""
                "},"
                "\"shoppingCenter\": {"
                    "\"fillColor\": \"#EFF0F0\""
                "},"
                "\"medical\": {"
                    "\"fillColor\": \"#D2D5D5\""
                "},"
                "\"nautical\": {"
                    "\"fillColor\": \"#D2D5D5\""
                "},"
                "\"cemetery\": {"
                    "\"fillColor\": \"#EFF0F0\""
                "},"
                "\"waterPoint\": {"
                    "\"fillColor\": \"#EFF0F0\""
                "},"
                "\"pointOfInterest\": {"
                    "\"fillColor\": \"#EFF0F0\""
                "},"
                "\"forest\": {"
                    "\"fillColor\": \"#D2D5D5\""
                "},"
                "\"vegetation\": {"
                    "\"fillColor\": \"#D2D5D5\""
                "},"
                "\"playingField\": {"
                    "\"fillColor\": \"#D2D5D5\""
                "},"
                "\"reserve\": {"
                    "\"fillColor\": \"#D2D5D5\""
                "},"
                "\"education\": {"
                    "\"fillColor\": \"#EFF0F0\""
                "},"
                "\"waterRoute\": {"
                    "\"visible\": false"
                "}"
	        "},"
	        "\"settings\": {"
		        "\"landColor\": \"#EFF0F0\""
	        "},"
	        "\"version\": \"1.0\""
        "}";

        auto myCustomStyleSheet = MapStyleSheet::ParseFromJson(jsonString);
        mapControl.StyleSheet(myCustomStyleSheet);

        AddPin(mapControl, 1, 47.618352, -122.355641);
        AddPin(mapControl, 2, 47.625585, -122.346084);
        AddPin(mapControl, 3, 47.601503, -122.333466);
        AddPin(mapControl, 4, 47.613619, -122.319122);
        AddPin(mapControl, 5, 47.617967, -122.303506);
        AddPin(mapControl, 6, 47.599382, -122.308134);

        auto hwGeoposition = BasicGeoposition();
        hwGeoposition.Latitude = 47.613808,
        hwGeoposition.Longitude = -122.3204697;
        auto hwPoint = Geopoint(hwGeoposition);

        mapControl.Center(hwPoint);
        mapControl.ZoomLevel(14);
        mapControl.LandmarksVisible(false);
        mapControl.BusinessLandmarksVisible(false);
        mapControl.TransitFeaturesVisible(false);

        auto visual{ ElementCompositionPreview::GetElementVisual(mapControl) };
        auto compositor{ visual.Compositor() };
        auto implicitAnimations{ compositor.CreateImplicitAnimationCollection() };

        auto scaleAnimation{ compositor.CreateVector3KeyFrameAnimation() };
        scaleAnimation.Duration(std::chrono::milliseconds{ 1500 });
        scaleAnimation.InsertExpressionKeyFrame(1.0f, L"this.FinalValue");
        implicitAnimations.Insert(L"Scale", scaleAnimation);

        auto offsetAnimation{ compositor.CreateVector3KeyFrameAnimation() };
        offsetAnimation.Duration(std::chrono::milliseconds{ 1500 });
        offsetAnimation.InsertExpressionKeyFrame(1.0f, L"this.FinalValue");
        implicitAnimations.Insert(L"Offset", offsetAnimation);

        visual.ImplicitAnimations(implicitAnimations);

        return mapControl;
    }

    void CustomUserControlViewManager::AddPin(winrt::Windows::UI::Xaml::Controls::Maps::MapControl& mapControl, int id, double lat, double lng)
    {
        auto myPoint = Geopoint(BasicGeoposition{ lat, lng, 0 });
        auto myPOI = MapIcon();
        myPOI.Location(myPoint);
        myPOI.NormalizedAnchorPoint(Point(0.5, 1.0));
        myPOI.ZIndex(0);
        myPOI.Image(RandomAccessStreamReference::CreateFromUri(Uri(L"ms-appx:///Assets/pin" + std::to_wstring(id) + L".png")));

        mapControl.MapElements().Append(myPOI);
    }

    // IViewManagerWithNativeProperties
    IMapView<hstring, ViewManagerPropertyType> CustomUserControlViewManager::NativeProps() noexcept {
        auto nativeProps = winrt::single_threaded_map<hstring, ViewManagerPropertyType>();

        nativeProps.Insert(L"label", ViewManagerPropertyType::String);
        nativeProps.Insert(L"color", ViewManagerPropertyType::Color);
        nativeProps.Insert(L"backgroundColor", ViewManagerPropertyType::Color);

        return nativeProps.GetView();
    }

    void CustomUserControlViewManager::UpdateProperties(
        FrameworkElement const& view,
        IMapView<hstring, IInspectable> const& propertyMap) {
        if (auto control = view.try_as<Windows::UI::Xaml::Controls::Maps::MapControl>()) {

            //const JSValueObject& propertyMap = JSValue::ReadObjectFrom(propertyMapReader);

            //for (auto const& pair : propertyMap) {
            //    auto const& propertyName = pair.first;
            //    auto const& propertyValue = pair.second;

            //    /*if (propertyName == "label") {
            //        if (propertyValue != nullptr) {
            //            auto const& value = winrt::box_value(winrt::to_hstring(propertyValue.String()));
            //            control.SetValue(Windows::UI::Xaml::Controls::Maps::MapControl::LabelProperty(), propertyValue);
            //        }
            //        else {
            //            control.ClearValue(Windows::UI::Xaml::Controls::Maps::MapControl::LabelProperty());
            //        }
            //    }
            //    else if (propertyName == "color") {
            //        if (auto value = propertyValue.To<Brush>()) {
            //            control.SetValue(Control::ForegroundProperty(), value);
            //        }
            //        else {
            //            control.ClearValue(Control::ForegroundProperty());
            //        }
            //    }
            //    else */ if (propertyName == "backgroundColor") {
            //        if (auto value = propertyValue.To<Brush>()) {
            //            control.SetValue(Control::BackgroundProperty(), value);
            //        }
            //        else {
            //            control.ClearValue(Control::BackgroundProperty());
            //        }
            //    }
            //}
        }
    }

    // IViewManagerWithCommands
    IMapView<hstring, int64_t> CustomUserControlViewManager::Commands() noexcept {
        auto commands = winrt::single_threaded_map<hstring, int64_t>();
        commands.Insert(L"CustomCommand", 0);
        return commands.GetView();
    }

    void CustomUserControlViewManager::DispatchCommand(
        FrameworkElement const& view,
        int64_t commandId,
        IVectorView<IInspectable> commandArgs) noexcept {
        if (auto control = view.try_as<Windows::UI::Xaml::Controls::Maps::MapControl>()) {
            if (commandId == 0) {
                // Execute command
            }
        }
    }

}