require "json"
package = JSON.parse(File.read(File.join(__dir__, '../', 'package.json')))

Pod::Spec.new do |s|
  s.name          = package['name']
  s.version       = package["version"]
  s.summary       = package['description']
  s.requires_arc  = true
  s.author        = { 'dzhuowen' => 'dzhuowen@fb.com' }
  s.license       = package["license"]
  s.homepage      = package["homepage"]
  s.source        = { :git => 'https://github.com/facebook/react-native-fbsdk.git' }
  s.platform      = :ios, '7.0'
  s.dependency      'React'

  s.subspec 'Core' do |ss|
    ss.dependency     'FBSDKCoreKit'
    ss.source_files = 'RCTFBSDK/core/*.{h,m}'
  end

  s.subspec 'Login' do |ss|
    ss.dependency     'FBSDKLoginKit'
    ss.source_files = 'RCTFBSDK/login/*.{h,m}'
  end

  s.subspec 'Share' do |ss|
    ss.dependency     'FBSDKShareKit'
    ss.source_files = 'RCTFBSDK/share/*.{h,m}'
  end
end
