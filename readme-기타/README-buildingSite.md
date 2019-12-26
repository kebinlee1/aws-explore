# About Wordpress, React, API Server, AWS Amplify

## Development Target for Blog Site Reference
1. WordPress
1. WordPress + React
1. Static Site Generator: Gatsby | Nextjs
1. AWS S3

## WordPress-React: *site-building/demo* - wp와 React 결합하기 demo

### To-Do list
* **done** simple interface using react
* **done** Templated 사용법 확인: **/webserver/README.md** 참조, 실제 사용은 의미 없을 듯..

* **doing** REACT Basics
    - **done** Navigation Header | Router: 
    - **done** Navigation Menu: see below
    - **done** PostList에 CardColumns 적용 **works Great!!!!**
    - **done** react-oute에서 component에 props 전달: **postList postView OK**
    - react-redux

* **doing** Styling
    - **done** React Bootstrap Theme: add react-bootstrap | bootstrap.min.css: see below
    - **done** Glyphicons | Font-Awsome : styling menu    
    - **done** Global link style.css in index.html
    - **done** Global import style.css in index.js **Recommended**
    - **done but no need** Styled Componont: https://medium.com/chequer/theme-in-react-js-dbf5377d0890
    - Material Design
    - Ant Design Theme system

* **done** WP API 기능 추가: site-building/tim source 참조 - PostList.js PostView.js
* **done** Create Post: **Currently Impossible**
    


* WP API guide 
    - WP API JWT authentication
    - signin/signup using react
    - posting in react
    - add comments in react
    - WooCommerce using react 

### Styling
* Global style: 가급적 index.js 에 정의, 제어가 쉽다: bootstrap
* fontAwesome은 react component를 사용
* Local style: 각 page의 custom style 정의

### posts/:slug
* App에서 slug를 param로 하여 Route 처리
* PostList에서 Link에 slug를 전달한다.

### bootstrap Use Tips
* Card
    - CardGroup | CardDeck은 모두 1 row만 보여진다.: 3개 이내일 경우만 사용
    - CardColumns: 
        - 기본적으로 3개의 컬럼으로 보여진다.
        - Card width 속성 추가하지 말것

### Navigation Menu
* *bootstrap navbar는 무조건 refresh 한다*
* react-router-dom 의 Link를 사용해야 refresh 하지 않는다.
* styling을 하려면 bootstrap html 를 이용한다.

### create app
* **npx create-react-app**


## Wordpress Support - Article 메뉴
https://wordpress.org/support

* Getting Started
* Installing WP
* Basic Usage
* Basic Administration
* Customizing
* Maintenance
* Security
* Advanced Topices
* Troubleshooting

## Gatsby | Nextjs

### To-Do list
* **doing** Nextjs: 
    - **done** nextjs/demo/1-navigate-between-pages
    - **done** nextjs/demo/2-using-shared-components
    - **done** nextjs/demo/3-create-dynamic-pages
    - **done** nextjs/demo/4-clean-urls
    - **done** nextjs/demo/6-fetching-data
    - nextjs/demo/7-styling-components
    - nextjs/demo/8-deploying
    - nextjs/demo/E1-static-export
    - nextjs/demo/E2-lazy-loading-modules
    - nextjs/demo/E3-lazy-loading-components

* **done** Gatsby demo try: 
    - 작은 web site 에 적합    
    - https://www.gatsbyjs.org/docs/quick-start

* **done** Comparison of 2: https://dev.to/jameesy/gatsby-vs-next-js-what-why-and-when-4al5
* Questions
    - Shopping Mall은 가능한가? 아닐듯...

### Nextjs
* Getting started: https://nextjs.org/learn/basics/getting-started
* Create project
```bash
mkdir hello-next
cd hello-next
npm init -y
npm install --save react react-dom next
mkdir pages
```
* add scripts in package.json
```js
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
}
```

### Gatsby

* Quick start
```bash
## install
$ npm install -g gatsby-cli

## Create New site
$ gatsby new <sitename>
$ cd <sitename>

## start developement server
$ gatsby develop 
# localhost:8000

## build
$ gatsby build

## serve the build locally
$ gatsby serve
```

* deploy in surge **NOT working**
```bash
## Deploy in Surge

# surge 
$ npm install --global surge
$ surge login   # log as student free access
# email: kebinlee1@gmail.com
# password: kx8

# deploy
$ surge public/ # NOT working
```

* deploy in AWS Amplify Console:
    - https://www.gatsbyjs.org/docs/deploying-to-aws-amplify/
    - https://www.gatsbyjs.org/blog/2018-08-24-gatsby-aws-hosting/

## WordPress 

### To-do List
* **done** 작성 Page | Post | Menus
* **done** Front page 연결 : Customize
* **done** Theme 선택 | Theme Customizing 
    - 사용 테마: Airi | Attitude | Twenty Twenty | Hestia trial
    - **MOST Important** 자주 테스트 해야 함. 테마별로 다름.    
* **done** attitude 테마로 만들어 보기: *Theme user guide 숙독할 것*
    - **done** home page slide setting
    - **done** Submenu 생성: 메뉴 생성해서 부모 메뉴아래에 위치 시킨다.
    - **done** 특정 Category 만의 Menu 생성: permaLink: category-name/post-name 형식으로 나오게 할 것
* Custom CSS: https://wplift.com/how-to-add-custom-css-to-wordpress
* Miscellaneous
    - Custom Post Types(CPT)
    - Custom Fields

### Theme 선택
* Airi Free version

### 매뉴 세팅
* Menu 등록이 가능한 항목: Page | Post | Custom link | Category
* Submenu는 들여쓰기처럼 해당 메뉴를 위치시킨다.
* Submenu의 부모 메뉴를 Blank처리 하려면, 서브메뉴 첫번째 항목을 menu로 하거나 Custom link를 생성한다.
* Home page 선택: Settings > Reading >> Your Homepage displays >> Homepage
* Blog page 선택: Settings > Reading >> Your Homepage displays >> Posts page

### Page | Post 작성 시 
* Elentor를 사용해서 Customizing이 가능하다.
* Featured Image가 Header Image이다.
* Page link는 Page 작성시
* Post Url은 permalink에서 세팅 가능

### Customize when using Elementor

### Customize in default template
* Using custom CSS: **need to test** with react js

## 블로그 - How to Start Wordpress
* 본문 참조: https://www.thewordcracker.com/basic/how-to-start-wordpress/
* 워드프레스 유료 테마 설치 후 데모 사이트와 비슷하게 설정하기
    - https://www.thewordcracker.com/basic/how-to-import-demo-files-after-installing-wordpress/
* 워드프레스 테마 삭제하기
    - https://iwordpower.com/how-to-delete-themes-in-wordpress/
* Attitude 테마로 워드프레스 무작정 시작하기
    - https://www.thewordcracker.com/basic/setting-wordpress-theme-attitude-from-the-scratch/
* Twenty Twelve 테마 + WooCommerce: 초간단 커스터마이징
    - https://www.thewordcracker.com/basic/very-simple-customization-twentwelve-and-woocommerce-in-wordpress/

### Hosting | Install
### Install and siteaddress/wp-admin, first setting
* Setting > General >> site language | Timezone
* Users > Your Profile >> edit >> Geneate Password | Admin Color scheme ...
 
### Showing "Under Construction"
https://www.thewordcracker.com/basic/%EC%9B%8C%EB%93%9C%ED%94%84%EB%A0%88%EC%8A%A4-%EA%B3%B5%EC%82%AC-%EC%A4%91%EC%82%AC%EC%9D%B4%ED%8A%B8-%EC%A4%80%EB%B9%84-%EC%A4%91%EC%9C%A0%EC%A7%80%EB%B3%B4%EC%88%98-%EC%95%8C%EB%A6%BC-%ED%94%8C/


### Apprearance
#### Theme

* Apprearance > Theme >> Add New >> Featured | Popular | Latest | Favorite
* on the Theme >> Install | Preview
* Apprearance > Theme >> Activate | Live Preview

#### Theme Customizing (using Twenty Twenty)

* Appearance > Customize OR Theme > on the Theme > Customize
* Active Theme
* Site Identity
    - Site Title
    - Tagline
    - Site Icon
    - Logo
* Colors
    - body background color
    - Header Footer bg color
    - Primary Color
* Theme Options
    - show search in header
    - On achiives pages, posts show 
* Cover Template
    - Fixed Background Image
    - Overlay bg color
    - Overlay text color
    - Overlay Opacity
* Menus
    - Menu name
    - Menu Location: Desktop Horizontal | Mobile | Footer | Social
    - Menu Options
* Widgets
* Homepage Settings
    - Your homepage displays: Lates posts | static page
    - Homepage
    - Posts page
* Addtional CSS


#### Widgets
#### Menus
* Appearance > Menus >> create a new Menu
#### Theme Editor
#### 유료 Theme 사용하기
https://iwordpower.com/how-to-install-or-remove-avada-demo/

* 테마가 언제 최종 업데이트되었는가? 오랫동안 업데이트되지 않은 테마는 선택하지 않도록 합니다. 워드프레스는 연중 2회 정도 메이저 업데이트가 이루어집니다. 테마가 오랫동안 업데이트되지 않으면 워드프레스와 호환 문제가 발생할 수 있습니다.
사용자들의 평가.
* 사용자들의 질문에 대한 테마 개발자(판매자)의 대응. 질문에 대해 적극적으로 대응하는지를 중점적으로 보면 좋을 듯 합니다.
제공되는 데모. 원하는 레이아웃이나 기능을 제공하는지 살펴봅니다. 가능한 비슷한 레이아웃이나 기능이 있는 테마를 선택하면 추후 커스터마이징(사용자 요구에 맞게 수정) 작업이 수월해질 수 있습니다.
* 쇼핑몰을 운영할 경우 WooCommerce 플러그인과 호환되는지 확인. 대부분 테마가 별 문제가 없지만, 테마에 따라 우커머스 템플릿이 테마에 포함되어 있을 수 있습니다("우커머스에서 특정 카테고리의 상품 나열하기" 참고).
* 다국어 사이트(예: 영어, 일본어, 중국어 사이트를 동시에 운영)를 운영하려는 경우 WPML과의 호환성 확인. 워드프레스에서 다국어 사이트는 WPML과 같은 플러그인을 사용하거나 멀티사이트를 이용할 수 있습니다.

### Posts

#### All Posts

#### Add New
* 제목
* 글 내용
* 카테고리 추가/선택
* 특성 아미지 추가
* 발행

#### Categories
#### Tags

#### 구텐베르그 편집기 비활성화 (v5.0 이상)
* Plugin > Add New >> Classing Editor

### Pages

#### All Pages
#### Add New
#### Landing Page(전면페이지) 설정
* Setting > Reading > 

### Plugin
* 글/페이지를 클릭 한 번으로 복제하기
* 공사중/사이트 준비 중/유지보수 알림 플러그인
* 워드프레스 사이트 이전하기(Duplicator)
* Loco Translate를 사용하여 워드프레스 테마/플러그인 번역하기
* WPML 플러그인으로 다국어 워드프레스 사이트 만들기
* 워드프레스 폼메일 플러그인 Contact Form 7 사용법
* Quform 컨택트 폼 플러그인 - 단계별로 양식을 입력할 수 있는 다중 페이지 기능 제공
* 사용이 편리한 워드프레스 컨택트 폼 플러그인 WPForms
* 워드프레스에 버디프레스(BuddyPress) 구성하기
* iThemes Security 워드프레스 보안 플러그인
* 워드프레스 최적화 플러그인 Autoptimize
* 워드프레스 팝업 플러그인 Popup Builder
* 기능이 많은 워드프레스 팝업 플러그인 Popup Maker
* 워드프레스 프리미엄 팝업 플러그인 - Convert Plus
* 간편하게 워드프레스 차일드 테마를 만들어 주는 Child Theme Configurator
* '혼합된 콘텐츠 차단' 문제를 수정하는 Really Simple SSL 플러그인

### Child Theme 만들기
### 쇼핑몰 운영하기
### Reset WordPress
### Form 생성
### 게시판 (망보드 예제)
### SEO
### Spam protection
### 사이트 통계 확인


## 블로그 - WPGuide site 글
참조: https://wpguide.usefulparadigm.com/contents
### 워드프레스 시작하기
* 카페24 웹호스팅으로 워드프레스 설치하기
* 워드프레스와 백업(backup)
* 워드프레스의 주요 개념
* 워드프레스 필수 플러그인 모음
* 워드프레스 사이트 이전(migration)하기
* 맘에 쏙 드는 테마 고르기 몇 가지 방법
* 자식 테마 다루기
* 워드프레스 5.0과 구텐베르크 끄기 
* AWS에 워드프레스를 호스팅하는 4가지 방법 
* 특정 유형 콘텐츠만 구텐베르크 적용하기 
* 블록 편집기로 매거진 스타일 글 목록 만들기 
* Astra 테마로 홈페이지 시작하기

### 워드프레스 사용하기
* 워드프레스에 커스텀 로그인/회원가입 추가하기
* Formidable Forms로 사용자 입력폼 만들기
* 페이지에 포스트 목록 추가하기
* Tailor로 페이지 레이아웃 디자인하기
* 워드프레스와 페이스북 연동하기
* 워드프레스 썸네일 이미지 다루기
* 워드프레스 사이드바에 로그인-로그아웃 메뉴 추가하기
* 워드프레스 캐시 제대로 쓰기
* Avada 테마로 5분만에 모던한 웹사이트 만들기 
* WordPress 사이트에서 메타 태그 관리하기
* 젯팩 Image CDN 사용하기
* 워드프레스에서 자바스크립트 다루기
* 워드프레스에 MailChimp 구독 팝업창 추가하기
* 워드프레스에서 시리즈 글 관리하기
* 테마 수정 없이 PHP 코드를 추가하는 몇 가지 방법
* 페이지 빌더 없이 UI 요소 추가하기
* 커스텀 페이지를 만드는 3+1가지 방법
* Divi 테마 간단 사용법
* Divi 테마에서 한글 폰트 다루기
* 특성 이미지 다루기
* 카테고리별 포스트 목록 보여주기 
* 워드프레스에 Google 태그 관리자 적용하기 
* 블록 편집기에서 재사용 블록 사용하기 
* 헤더 푸터 없는 페이지 만들기 
* 카카오톡 플러스친구 버튼 추가하기 
* BlockLab으로 커스텀 블록 만들기 
* 워드프레스 사용자 권한 조정하기 
* 구글 사이트킷으로 워드프레스 사이트 분석하기 
* 고전 편집기와 블록 편집기 선택하기

### 워드프레스 활용하기
* [워드프레스로 모임서비스 만들기] 1. 모임목록 만들기
* [워드프레스로 모임서비스 만들기] 2. 새 모임 개설하기
* [워드프레스로 모임서비스 만들기] 3. 사용자 로그인하기
* [워드프레스로 모임서비스 만들기] 4. 모임 참가신청 받기
* [워드프레스로 모임서비스 만들기] 5. 지도와 지역별 메뉴
* 워드프레스로 카드뉴스 포스트 만들기
* 워드프레스에서 무한 스크롤 페이지 넘기기
* 워드프레스 테마에 Bootstrap 적용하기
* 워드프레스와 Discourse 포럼 연동하기
* MailPoet 3 플러그인으로 뉴스레터 서비스 만들기
* WP-Members로 회원제 사이트 만들기 
* Restrict Content로 워드프레스에 멤버십 기능 추가하기 
* Ultimate Member로 사용자 로그인 처리하기 
* 워드프레스에 전문검색(fulltext search) 추가하기 
* 팝업 플러그인 없이 팝업창 띄우기 

### 워드프레스 개발자
* 워드프레스에서 웹 요청 처리하기
* Docker로 워드프레스 설치하기
* GitHub Updater로 워드프레스 테마 배포하기
* 워드프레스와 Cron 
* 워드프레스 이메일 발송 처리
* 워드프레스에서 파일 업로드 처리하기
* Gutenberg 커스텀 블럭 만들기
* ACF로 커스텀 블럭 만들기 

