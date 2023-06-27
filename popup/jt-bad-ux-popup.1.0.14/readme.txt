=== jt-bad-ux-popups ===
Contributors: Studio JT
Tags: popup, simple, image popup, korea
Requires at least: 4.9
Tested up to: 4.9
License: GPLv3 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.html

== Description ==

* 간단한 이미지 팝업을 쉽게 설정하여 사용할 수 있습니다.
* 여러개의 팝업을 동시에 사용할 수 있습니다.
* 기간을 설정하여 팝업을 개시할 수 있습니다.

== Installation ==

1. 다운로드 받은 플러그인을 FTP를 통해 'Plugins' 폴더로 업로드 하거나,
   워드프레스 관리자-> 플러그인 탭 에서 'JT BAD UX POPUP' 검색 후 설치
2. 'JT BAD UX POPUP' 플러그인 활성화


== Changelog ==

= 1.0.14 =
* [JJW] 특정 페이지 팝업 노출 오류 수정

= 1.0.13 =
* 관리자 포스트 조회 페이징 처리
* jt-popup-show.js 비동기 처리

= 1.0.12 =
* 서브 디렉토리에 워드프레스 설치 시 url 대응

= 1.0.11 =
* rest api 404 오류 시 /wp-admin/admin-ajax.php 호출 로직 추가

= 1.0.10 =
* fix mobile position center
* 다국어 처리 반영 및 번역 추가
* fix don't show again border color
* fix mobile template overlay opacity
* multisite 대응

= 1.0.9 =
* rest api 페이지별 팝업 이슈 수정
* jt-popup-show.js 재사용을 위해 글로벌 변수(JT_BAD_UX_POPUP) 및 init 함수로 변경

= 1.0.8 =
*관리자 jquey ui 이슈 문제 해결

= 1.0.7 =
*아이패드에서 모바일로 적용

= 1.0.6 =
*관리자 모드 2배 이미지 등록시 원본 이미지도 같이 바뀌는 이슈 수정

= 1.0.5 =
*모바일에서 팝업이 1개 일 때 중앙정렬
*모바일에서 스크롤 시 브라우저 상태바 영역 아래에 있던 overlay 깜박거림 수정

= 1.0.4 =
*여백 미설정시 중앙으로 오지 않던 오류 수정
*관리자 미리보기 클릭시 제일 상단에 나오는 팝업을 현재화면 기준으로 나오게 수정
 (position: absolute → fixed)

= 1.0.3 =
* z-index 수정 (avada theme header z-index issue)
* 전면 페이지 사용시 해당 페이지에 팝업 노출

= 1.0.2 =
* 설정 출력시 escape attribute 적용

= 1.0.1 =
* 커스텀 커서 제거

= 1.0.0 =
* 플러그인 등록
