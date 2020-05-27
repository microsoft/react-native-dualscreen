// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

#import "DualScreenInfo.h"

@implementation DualScreenInfo

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(sampleMethod:(NSString *)stringArgument numberParameter:(nonnull NSNumber *)numberArgument callback:(RCTResponseSenderBlock)callback)
{
    // TODO: Implement some actually useful functionality
    callback(@[[NSString stringWithFormat: @"numberArgument: %@ stringArgument: %@", numberArgument, stringArgument]]);
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"didUpdateSpanning"];
}

@end
