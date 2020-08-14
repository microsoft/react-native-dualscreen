// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

#pragma once

#include <functional>
#include "NativeModules.h"
#include "winrt/Windows.UI.ViewManagement.h"

namespace winrt {
    using namespace Windows::UI::ViewManagement;
    using namespace Windows::Foundation;
}

namespace DualScreenInfo
{
    // TODO: Remove once ApplicationViewMode::Spanning is available in the SDK
    const auto c_ApplicationViewModeSpanning = static_cast<winrt::ApplicationViewMode>(2);

    REACT_STRUCT(Rect);
    struct Rect {
        REACT_FIELD(Width)
        float Width;

        REACT_FIELD(Height)
        float Height;

        REACT_FIELD(X)
        float X;

        REACT_FIELD(Y)
        float Y;
    };


    REACT_MODULE(DualScreenInfo);
    struct DualScreenInfo
    {
        REACT_CONSTANT(IsDualScreenDevice, L"isDualScreenDevice");
        const bool IsDualScreenDevice = winrt::ApplicationView::GetForCurrentView().IsViewModeSupported(c_ApplicationViewModeSpanning);

        REACT_CONSTANT(IsSpanned, L"isSpanned");
        const bool IsSpanned = winrt::ApplicationView::GetForCurrentView().ViewMode() == c_ApplicationViewModeSpanning;

        REACT_SYNC_METHOD(GetSpanningRects, L"getSpanningRects");
        std::vector<Rect> GetSpanningRects() noexcept
        {
            if (const auto view{ winrt::ApplicationView::GetForCurrentView() })
            {
                if (const auto appView{ view.try_as<winrt::IApplicationViewSpanningRects>() })
                {
                    const auto spanningRects{ appView.GetSpanningRects() };
                    std::vector<Rect> rects(spanningRects.Size());

                    for (auto const& rect : spanningRects)
                    {
                        rects.emplace_back(Rect{ rect.Width, rect.Height, rect.X, rect.Y });
                    }

                    return rects;
                }
            }
            return {};
        }

        REACT_EVENT(FireSpanningChangeEvent, L"onSpanningChange");
        std::function<void(const JSValue&)> FireSpanningChangeEvent;

        REACT_EVENT(FireWindowSizeChangeEvent, L"onWindowSizeChange");
        std::function<void(const JSValue&)> FireWindowSizeChangeEvent;
    };

} // namespace DualScreenInfo
