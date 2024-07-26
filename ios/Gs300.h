
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNGs300Spec.h"

@interface Gs300 : NSObject <NativeGs300Spec>
#else
#import <React/RCTBridgeModule.h>

@interface Gs300 : NSObject <RCTBridgeModule>
#endif

@end
