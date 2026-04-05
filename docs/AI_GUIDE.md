# AI GUIDE

## Tech Stack
- Next.js (App Router)
- TypeScript
- SCSS
- Yarn (npm 대신 사용)

## File Structure
- app/: 페이지 라우팅
- components/: 재사용 컴포넌트
- lib/: 유틸 함수
- styles/: 전역 스타일 (e.g. global.css)
- public/: 정적 리소스 (e.g. img/, svg/)

## Coding Rules
- 함수형 컴포넌트만 사용
- TypeScript 타입 명시 필수
- Hook 사용 시 해당 파일 최상단 `"use client";` 작성
- 상태 관리: `useState`
- 생명주기/부수 효과 관리: `useEffect`

## Style Rules
- 전역 스타일은 `styles/globals.css`에서 관리한다.
- `globlas.css`에는 reset, 기본 typography, html/body 스타일만 작성한다.
- 전역 스타일에 UI 컴포넌트 스타일을 작성하지 않는다.

- 컴포넌트 스타일은 SCSS Modules를 사용한다. (Tailwind, CSS 파일 금지)
- 각 컴포넌트는 동일한 폴더에 `.module.scss` 파일을 둔다.
- `.module.scss`파일 이름은 컴포넌트 이름과 동일하게 작성한다.

- 모든 스타일링은 **first-mobile (mobile-first) 기준**으로 작성
  - 이후 미디어쿼리나 반응형 설정을 통해 태블릿/데스크탑으로 확장
- 반응형 단위 사용 권장
  - rem, %, vw, dvh 등 상대 단위 활용

예시:

styles/
├── globals.css

ComponentName/
├── ComponentName.tsx
├── component-name.module.scss

## Asset Rules
- 공용 리소스가 아닌 경우 `public` 폴더를 사용하지 않는다.
- 모든 컴포넌트는 폴더 단위로 생성한다.
- 각 컴포넌트는 단일 파일로 생성하지 않고, 반드시 디렉토리 구조를 사용한다.
- 디렉토리 이름은 kebab-case를 사용한다.
- 컴포넌트에 리소스가 필요한 경우에만 `assets` 폴더를 생성한다.
- 사용하지 않는 빈 폴더는 생성하지 않는다.
- 이미지 및 아이콘은 반드시 `assets` 폴더에 위치시킨다.

예시:

component-name/
├── ComponentName.tsx
├── component-name.module.scss
├── assets/

## Component Rules
- 재사용 가능한 컴포넌트는 `components/ui` 폴더에 배치한다. (e.g. 버튼, 입력 필드, 모달 등과 같은 UI 요소들)

- 해당 파일 전용 컴포넌트는 해당 파일과 동일한 위치에 새로운 컴포넌트 디렉토리를 생성하고 그 안에 배치한다. (e.g. 페이지별 컴포넌트 또는 특정 기능에만 필요한 컴포넌트)

- **컴포넌트는 단일 책임 원칙(Single Responsibility Principle)**을 따르며, 각 컴포넌트는 하나의 역할만 담당한다. (e.g. 버튼 컴포넌트는 버튼만, 헤더는 헤더만 담당)

- 재사용 가능한 컴포넌트는 가능한 한 props로 외부 값을 전달받아 설정이 가능하도록 한다.

- 컴포넌트 구조는 디렉토리 기반으로 관리하고, 각 컴포넌트의 이름은 PascalCase로 작성한다.

- 각 컴포넌트는 자체 스타일을 관리하며, .module.scss 파일을 사용한다. 스타일 파일의 이름은 컴포넌트 파일과 동일하게 한다. (e.g. Button.tsx와 button.module.scss)

- 컴포넌트가 외부 리소스를 필요로 하는 경우 해당 리소스는 assets 폴더 내에 위치시키고, assets 폴더가 반드시 필요한 경우에만 생성한다.

- 컴포넌트는 가능한 범용적으로 설계하며, 특정 페이지나 컨텍스트에 종속적인 로직은 최소화한다.

- Props 정의: props는 명확하게 타입을 지정하고, 필수값과 선택값을 구분하여 명확하게 정의한다.

- 컴포넌트에 의존하는 라이브러리나 유틸 함수는 lib/ 디렉토리에서 관리하고, 그에 맞는 로직은 별도로 구현하여 컴포넌트의 책임을 분리한다.

- 상태 관리가 필요한 컴포넌트는 해당 상태를 컴포넌트 내에서 관리하거나, 상태 관리 라이브러리(Redux, Zustand 등)을 통해 글로벌 상태를 관리하도록 한다.

- Props와 상태 변경 시 변경에 대한 책임은 컴포넌트 내에서 처리하고, 외부에서 직접적인 상태 변경은 지양한다.

## Naming Convention
- 컴포넌트: PascalCase (ex: Header.tsx)
- 함수/변수: camelCase
- ts/SCSS Module 파일, 디렉토리: kebab-case 

## Forbidden
- class component 사용 금지
- any 타입 금지
- 인라인 스타일 금지

## Package Rules
- 프로젝트에서는 **Yarn**을 사용
- npm 사용 금지

<!-- ## Important
기존 컴포넌트 수정 금지
새 기능은 반드시 새로운 파일로 생성할 것 -->

