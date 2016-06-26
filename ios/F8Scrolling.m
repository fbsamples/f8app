/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import <UIKit/UIKit.h>
#import <CoreGraphics/CoreGraphics.h>

#import "F8Scrolling.h"
#import "RCTUIManager.h"
#import "RCTScrollView.h"

@interface F8Scrolling () {
  NSMapTable *_pinnedViews;
  NSMapTable *_distances;
}

@end

@implementation F8Scrolling

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

- (instancetype)init
{
  if (self = [super init]) {
    _pinnedViews = [[NSMapTable alloc] initWithKeyOptions:NSMapTableWeakMemory valueOptions:NSMapTableWeakMemory capacity:20];
    _distances = [[NSMapTable alloc] initWithKeyOptions:NSMapTableWeakMemory valueOptions:NSMapTableStrongMemory capacity:20];
  }
  return self;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(pin:(nonnull NSNumber *)scrollViewReactTag
                  toView:(nonnull NSNumber *)pinnedViewReactTag
                  withDistance:(nonnull NSNumber *)distance)
{
  UIView *pinnedView = [self.bridge.uiManager viewForReactTag:pinnedViewReactTag];
  UIView *scrollView = [self.bridge.uiManager viewForReactTag:scrollViewReactTag];
  if ([scrollView isKindOfClass:[RCTScrollView class]]) {
    RCTScrollView *reactScrollView = (RCTScrollView *)scrollView;
    [_pinnedViews setObject:pinnedView forKey:reactScrollView.scrollView];
    [_distances setObject:distance forKey:reactScrollView.scrollView];
    [reactScrollView addScrollListener:self];
    [self scrollViewDidScroll:reactScrollView.scrollView];
  }
}

RCT_EXPORT_METHOD(unpin:(nonnull NSNumber *)scrollViewReactTag)
{
  UIView *scrollView = [self.bridge.uiManager viewForReactTag:scrollViewReactTag];
  if ([scrollView isKindOfClass:[RCTScrollView class]]) {
    RCTScrollView *reactScrollView = (RCTScrollView *)scrollView;
    [_pinnedViews removeObjectForKey:reactScrollView.scrollView];
    [_distances removeObjectForKey:reactScrollView.scrollView];
    [reactScrollView removeScrollListener:self];
  }
}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
  UIView *pinnedView = [_pinnedViews objectForKey:scrollView];
  if (!pinnedView) {
    return;
  }

  CGFloat distance = [[_distances objectForKey:scrollView] doubleValue];
  CGFloat y = MAX(0, distance - scrollView.contentOffset.y);
  pinnedView.transform = CGAffineTransformMakeTranslation(0, y);
}

@end