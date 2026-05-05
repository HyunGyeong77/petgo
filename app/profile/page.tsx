"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import { ROUTES } from "@/constants/routes";
import type { CartItem, CombinedWishCartTab, ProfileFormState, WishItem } from "@/lib/profile/profile-types";
import { INITIAL_CART_ITEMS, INITIAL_WISH_ITEMS } from "@/lib/profile/profile-mock-data";
import ProfileAccountForm from "./profile-account-form/ProfileAccountForm";
import ProfileCollapsibleSection from "./profile-collapsible-section/ProfileCollapsibleSection";
import ProfileWishCartSection from "./profile-wish-cart-section/ProfileWishCartSection";
import ProfileBookmarksSection from "./profile-bookmarks-section/ProfileBookmarksSection";
import ProfileAccountDangerZone from "./profile-account-danger-zone/ProfileAccountDangerZone";
import { useAuth } from "@/providers/AuthContext";
import { supabase } from "@/lib/supabase";
import { showToast } from "@/utils/toast";
import Loading from "../loading";
import { useUserBookmark, useUserBookmarkPost } from "@/hooks/useUserBookmark";

export default function Page(): React.JSX.Element {
  const auth = useAuth();
  const user = auth?.user?.user_metadata;

  if(!user) return <Loading />

  const nickname = user.display_name ?? user.name;

  const [form, setForm] = useState<ProfileFormState>({
    nickname: nickname,
    email: user.email,
    password: "",
  });

  const [checkPassword, setCheckPassword] = useState<string>("");
  const [isNicknameModal, setIsNicknameModal] = useState<boolean>(false);
  const [isCheckPassword, setIsCheckPassword] = useState<boolean>(false);

  const [isNicknameEditable, setIsNicknameEditable] = useState<boolean>(false);
  const [wishItems, setWishItems] = useState<WishItem[]>(INITIAL_WISH_ITEMS);
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [isCombinedOpen, setIsCombinedOpen] = useState<boolean>(false);
  const [isBookmarkOpen, setIsBookmarkOpen] = useState<boolean>(false);
  const [combinedActiveTab, setCombinedActiveTab] = useState<CombinedWishCartTab>("cart");

  const isAnyCartItemSelected: boolean = cartItems.some((item: CartItem) => item.selected);

  const { data: userBookmarks } = useUserBookmark(auth?.user?.id);
  const productIds = userBookmarks?.map((b) => b.product_id) ?? [];
  const { data: userBookmarkPost } = useUserBookmarkPost(productIds);

  // 패스워드 모달 활성화 및 비활성화 시 input 값 초기화
  useEffect(() => {
    setCheckPassword("");
  }, [isNicknameModal]);
  
  // input onChange 핸들러 (정보를 변경할 때)
  const handleChange = (field: keyof ProfileFormState, value: string): void => {
    setForm((prev: ProfileFormState) => ({
      ...prev,
      [field]: value,
    }));
  };


  /* 닉네임 */
  // 닉네임 변경을 취소할 때 (원래 닉네임 상태로 되돌리기)
  useEffect(() => {
    if(isCheckPassword) return;

    setForm((prev: ProfileFormState) => {
      if(prev.nickname === nickname) return prev;

      return {
        ...prev,
        nickname: nickname
      };
    });
  }, [isCheckPassword]);


  // 패스워드 모달 활성화 시 입력하는 패스워드 값
  const handleCheckPasswordChange = (value: string): void => {
    setCheckPassword(value);
  }

  // 패스워드 인증 모달 활성화 및 비활성화
  const handleNicknameModalEdit = (): void => {
    setIsNicknameModal((prev: boolean) => !prev);
  }

  // 패스워드 확인
  const handleCheckPassword = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: checkPassword
      });

      if(error) throw new Error(error.message);

      setIsCheckPassword(true);
      setIsNicknameEditable(true);
      setIsNicknameModal(false);
    } catch (err) {
      showToast("error", "비밀번호가 일치하지 않습니다");
    }
  }

  // 닉네임 변경
  const handleNicknameChange = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          display_name: form.nickname
        }
      });

      if(error) throw new Error(error.message);

      const { error: updateError } = await supabase.rpc("user_nickname_update", {
        p_display_name: form.nickname
      });

      if(updateError) throw new Error(updateError.message);

      showToast("success", "닉네임이 변경되었습니다.");
      handleNicknameCancel();
    } catch (err) {
      showToast("error", `닉네임을 변경하는 도중 문제가 발생했습니다. \n다시 시도해 주세요`);
      console.log(err);
    }
  }

  // 닉네임 변경 취소
  const handleNicknameCancel = (): void => {
    setIsCheckPassword(false);
    setIsNicknameEditable(false);
  };
  
  /* 패스워드 */
  const handlePasswordEdit = async (): Promise<void> => {
    const lastSentTime = Number(localStorage.getItem("reset_email_time") ?? 0);

    if(lastSentTime && Date.now() - lastSentTime < 6000) {
      showToast("error", "잠시 후 다시 시도해주세요.");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(form.email, {
        redirectTo: `${window.location.origin}${ROUTES.auth.resetPassword}`
      });

      if(error) throw new Error(error.message);

      showToast("success", "이메일이 전송되었습니다.");
      localStorage.setItem("reset_email_time", Date.now().toString());
    } catch (err) {
      showToast("error", "이메일을 전송하는 도중 문제가 발생했습니다.");
      localStorage.setItem("reset_email_time", Date.now().toString());
      console.log(err);
    }
  };

  /* 찜 */
  const handleDeleteWishItem = (id: number): void => {
    setWishItems((prev: WishItem[]) => prev.filter((item: WishItem) => item.id !== id));
  };

  const handleToggleWishItem = (id: number): void => {
    setWishItems((prev: WishItem[]) =>
      prev.map((item: WishItem) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleSelectAllWishItems = (): void => {
    const shouldSelectAll: boolean = wishItems.some((item: WishItem) => !item.selected);
    setWishItems((prev: WishItem[]) =>
      prev.map((item: WishItem) => ({ ...item, selected: shouldSelectAll }))
    );
  };

  const handleRemoveSelectedWishItems = (): void => {
    setWishItems((prev: WishItem[]) => prev.filter((item: WishItem) => !item.selected));
  };

  const handleAddWishItemToCart = (item: WishItem): void => {
    setCartItems((prev: CartItem[]) => {
      const existingItem: CartItem | undefined = prev.find((cart: CartItem) => cart.id === item.id);
      if (existingItem) {
        return prev.map((cart: CartItem) =>
          cart.id === item.id ? { ...cart, quantity: cart.quantity + 1 } : cart
        );
      }

      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          imageText: item.imageText,
          href: item.href,
          quantity: 1,
          selected: false,
        },
      ];
    });
  };

  /* 장바구니 */
  const handleToggleCartItem = (id: number): void => {
    setCartItems((prev: CartItem[]) =>
      prev.map((item: CartItem) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleSelectAllCartItems = (): void => {
    const shouldSelectAll: boolean = cartItems.some((item: CartItem) => !item.selected);
    setCartItems((prev: CartItem[]) =>
      prev.map((item: CartItem) => ({ ...item, selected: shouldSelectAll }))
    );
  };

  const handleRemoveSelectedCartItems = (): void => {
    setCartItems((prev: CartItem[]) => prev.filter((item: CartItem) => !item.selected));
  };

  const handleDeleteCartItem = (id: number): void => {
    setCartItems((prev: CartItem[]) => prev.filter((item: CartItem) => item.id !== id));
  };

  const handleUpdateCartItemQuantity = (id: number, delta: number): void => {
    setCartItems((prev: CartItem[]) =>
      prev.map((item: CartItem) =>
        item.id === id
          ? { ...item, quantity: Math.min(100, Math.max(1, item.quantity + delta)) }
          : item
      )
    );
  };

  return (
    <main className={styles.wrapper}>
      <section className={styles.container}>
        <header className={styles.headerRow}>
          <h1 className={styles.title}>프로필</h1>
          <Link href={ROUTES.app.home} className={styles.homeLink}>
            홈으로
          </Link>
        </header>

        <div className={styles.form}>
          <ProfileAccountForm
            form={form}
            isNicknameEditable={isNicknameEditable}
            isNicknameModal={isNicknameModal}
            onNicknameModalEdit={handleNicknameModalEdit}
            onNicknameChange={handleNicknameChange}
            onNicknameCancel={handleNicknameCancel}
            checkPassword={checkPassword}
            isCheckPassword={isCheckPassword}
            onCheckPassword={handleCheckPassword}
            onCheckPasswordChange={handleCheckPasswordChange}
            onFieldChange={handleChange}
            onPasswordEdit={handlePasswordEdit}
          />
        </div>

        <ProfileCollapsibleSection
          title="찜/장바구니"
          isOpen={isCombinedOpen}
          onToggle={() => setIsCombinedOpen((prev: boolean) => !prev)}
          contentId="combined-content"
        >
          <ProfileWishCartSection
            activeTab={combinedActiveTab}
            onTabChange={setCombinedActiveTab}
            cartItems={cartItems}
            wishItems={wishItems}
            isAnyCartItemSelected={isAnyCartItemSelected}
            onToggleCartItem={handleToggleCartItem}
            onSelectAllCartItems={handleSelectAllCartItems}
            onRemoveSelectedCartItems={handleRemoveSelectedCartItems}
            onDeleteCartItem={handleDeleteCartItem}
            onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
            onToggleWishItem={handleToggleWishItem}
            onSelectAllWishItems={handleSelectAllWishItems}
            onRemoveSelectedWishItems={handleRemoveSelectedWishItems}
            onDeleteWishItem={handleDeleteWishItem}
            onAddWishItemToCart={handleAddWishItemToCart}
          />
        </ProfileCollapsibleSection>

        <ProfileBookmarksSection
          items={userBookmarkPost}
          isOpen={isBookmarkOpen}
          onToggle={() => setIsBookmarkOpen((prev: boolean) => !prev)}
        />

        <ProfileAccountDangerZone />
      </section>
    </main>
  );
}
