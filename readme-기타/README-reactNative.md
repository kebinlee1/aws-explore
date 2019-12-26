# React Native + Amplify Test app Get Started

## Using React-native cli (npx react-native)

참조: https://facebook.github.io/react-native/docs/getting-started

### Install

* Chocolatey 설치: 
    - https://chocolatey.org/install 
    - admin 권한으로 powershell 실행하여 설치

* React Native Cli Quickstart for windows and android
    - nodejs: node 8.3 or newer
    - python2 **node LTS12.10.0 설치하면 자동으로 설치 됨.**
    - jdk

```bash
    ## node LTS12.10.0 설치하면 자동으로 설치 됨. 
    ## chocolatey와 python2가 sub tool로 설치됨
    $ choco install -y nodejs.install python2 jdk8 ## 따라서 jdk8만 설치해도 됨.
```

* yarn 설치
```bash
$ npm install -g yarn
```

* Android Studio 설치
    - Window version 설치
    - Install packages: welcome > *Configure* (or Appearance & Behavior > System Settings > Adndroid SDK > Preferences)
    - SDK Platforms version: Android 9 (Pie)
    - SDK Tools > Android SDK Build-Tools > 28.0.0
    - Click *Apply*
    - ANDROID_HOME 환경변수 추가
    - Using a Virtual device or a Real Phone
    - install intel HAXM

* Amplify 설치
```bash
$ yarn add aws-amplify --save
$ yarn add aws-amplify-react-native --save

# link dependecies when react-native version is below 0.60
# current version: 6.12.0 ??
$ npx react-native link

# UI
$ yarn add aws-amplify-react 
```

### Create React Native only Example Project and Run

```bash
    $ npx react-native ProjectName
    $ cd ProjectName
    $ npx react-native run-android 
```

* **Error:** - Android SDK not found: 
    - ProjectName/android/locla.properties file 생성
    - **sdk.dir = C:\\Users\\kebinlee\\AppData\\Local\\Android\\Sdk** 추가

* **Error:** - "spawnSync C:\Users\kebinlee\AppData\Android\Sdk/platform-tools/adb ENOENT"
    - [adb.exe, fastboot.exe, AdbWinApi.dll and AdbWinUsbApi.dll] 파일들을 상기 폴더에 복사 **Only Way**

* **Error:** "Unable to load script.Make sure you are either running a Metro server or that your bundle 'index.android.bundle' is packaged correctly for release"
    - native-script start 먼저해야 한다? : **old version에서만 가능**
    - android/app/src/main/AndroidManifest.xml 에 'android:usesCleartextTraffic="true"' 추가 **Not work**
    - command adb reverse....
    - node_modules\metro-config\src\defaults\blacklist.js **WORKS Great!!!!!!!!!!!!!!!!!!!!!** (Running android studio and emulator at the same time)   

```bash 
    $ adb reverse tcp:8081 tcp:8081
```
```js
    // replace this part in node_modules\metro-config\src\defaults\blacklist.js
    var sharedBlacklist = [
        /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
        /website\/node_modules\/.*/,
        /heapCapture\/bundle\.js/,
        /.*\/__tests__\/.*/
    ];
```

### Running - npx react-native run-androind in project root folder

* **Error**
    - **yarn install** 했더니 **emulator를 자동으로 띄움**
        - Delete node_modules: rm -rf node_modules and run yarn install
        - Reset Metro's cache: yarn start --reset-cache
        - Remove the cache: rm -rf /tmp/metro-*
```bash
## Error message
Looking for JS files in
   F:\aws-iot\test\reactnative\HelloReact

Loading dependency graph, done.
error: bundling failed: Error: Unable to resolve module `assert` from `node_modules\@jest\console\build\BufferedConsole.js`: assert could not be found within the project or in these directories:
  ..\..\node_modules

If you are sure the module exists, try these steps:
 1. Clear watchman watches: watchman watch-del-all
 2. Delete node_modules: rm -rf node_modules and run yarn install
 3. Reset Metro's cache: yarn start --reset-cache
 4. Remove the cache: rm -rf /tmp/metro-*
    at ModuleResolver.resolveDependency (F:\aws-iot\test\reactnative\HelloReact\node_modules\metro\src\node-haste\DependencyGraph\ModuleResolution.js:186:15)
    at ResolutionRequest.resolveDependency (F:\aws-iot\test\reactnative\HelloReact\node_modules\metro\src\node-haste\DependencyGraph\ResolutionRequest.js:52:18)
    at DependencyGraph.resolveDependency (F:\aws-iot\test\reactnative\HelloReact\node_modules\metro\src\node-haste\DependencyGraph.js:282:16)
    at Object.resolve (F:\aws-iot\test\reactnative\HelloReact\node_modules\metro\src\lib\transformHelpers.js:267:42)
    at F:\aws-iot\test\reactnative\HelloReact\node_modules\metro\src\DeltaBundler\traverseDependencies.js:426:31
    at Array.map (<anonymous>)
    at resolveDependencies (F:\aws-iot\test\reactnative\HelloReact\node_modules\metro\src\DeltaBundler\traverseDependencies.js:423:18)
    at F:\aws-iot\test\reactnative\HelloReact\node_modules\metro\src\DeltaBundler\traverseDependencies.js:275:33
    at Generator.next (<anonymous>)
    at asyncGeneratorStep (F:\aws-iot\test\reactnative\HelloReact\node_modules\metro\src\DeltaBundler\traverseDependencies.js:87:24)
 BUNDLE  [android, dev] ./index.js ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ 99.1% (447/450)::ffff:127.0.0.1 - - [13/Nov/2019:02:04:39 +0000] "GET /index.bundle?platform=android&dev=true&minify=false HTTP/1.1" 500 - "-" "okhttp/3.12.1"
 BUNDLE  [android, dev] ./index.js ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ 99.1% (447/450), failed.
```

### Modules for aws-iot

* aws-iot-device-sdk.js **Not working**
* **Amplify Pubsub을 사용해야 할 듯**
* 그래도 안되면 Android에서.....

***

### Using Amplify

* **amplify configure**: set up access to aws account, and profile name 
```bash
$ amplify configure
## profile name: default
```

* **amplify init**: 

* **amplify add auth**: add coginito
```bash
$ amplify add auth
Using service: Cognito, provided by: awscloudformation


 The current configured provider is Amazon Cognito.

 Do you want to use the default authentication and security configuration? Default configuration
 Warning: you will not be able to edit these selections.
 Warning: you will not be able to edit these selections.
 How do you want users to be able to sign in? Username
 Do you want to configure advanced settings? (Use arrow keys)
 Do you want to configure advanced settings? No, I am done.
Successfully added resource helloreact5c1c6338 locally

Some next steps:
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
```    

* **amplify push**: aws resource(cognito | IAM | policy) 자동 생성

* code edit https://aws-amplify.github.io/docs/js/react
```js
// in Aws-iot-amplify-test.js
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';

Amplify.configure(awsconfig);
//
// HelloWroldApp
//
export default withAuthenticator(HelloWorldApp, true);
```

* **Run app**: working **OK** - **SignUp/In page displayed successfully**
```bash
$ npx react-native run-android
```

* **Next** ==> **Amplify with react에서 모두 테스트 후 retry**

## Using Expo CLI

### Install

```bash
$ npm install -g expo-cli
```

### Create Project

```bash
$ expo init ProjectName
# [09:59:08] Input is required, but Expo CLI is in non-interactive mode.
# --template: argument is required in non-interactive mode. Valid choices are: 'blank', 'blank (TypeScript)', 'tabs', 'minimal', 'minimal (TypeScript)' or any custom template (name of npm package).
```
* **Error**
    - expo init error: bash에서 사용 시 Option 지정해야 하는듯
    - 참조: https://stackoverflow.com/questions/52731872/expo-is-not-recognized-as-an-internal-or-external-command

* **npx react-native working OK 이므로 테스트 보류함.**
***
