# Component Generation Template

다음 조건을 모두 만족하는 컴포넌트를 생성해줘.

## Rules
- Next.js App Router,
- TypeScript 사용
- SCSS Module 사용
- 함수형 컴포넌트
- 반응형

---

# Profile Page 제작

위치:
`app/profile/*`

요구사항:
- 프로필 페이지 제작
- `app/profile/page.tsx` 라우팅 대상 파일
- 디폴트 색상
  - #f59e0b,
  - #111827, 
  - #fff, 
  - #fef3c7
- 닉네임, 이메일, 패스워드, 닉네임 변경, 패스워드 변경, 찜, 장바구니, 북마크, 계정 삭제 버튼 포함
- 이메일 변경 불가
- 패스워드 `type="password"`
- 닉네임, 패스워드 기본 변경 불가 상태
  - 닉네임 변경 버튼을 통해 패스워드 입력 시 닉네임 변경 가능
  - 패스워드 변경 버튼을 통해 가입한 이메일 인증 시 패스워드 변경 가능
- Wrapper를 뷰포트 정중앙에 위치