import Link from "next/link";
import type { CartItem, CombinedWishCartTab, WishItem } from "@/lib/profile/profile-types";
import { formatPrice } from "@/lib/profile/format-price";
import Button from "@/components/ui/button/Button";
import styles from "./profile-wish-cart-section.module.scss";

export type ProfileWishCartSectionProps = {
  activeTab: CombinedWishCartTab;
  onTabChange: (tab: CombinedWishCartTab) => void;
  cartItems: CartItem[];
  wishItems: WishItem[];
  isAnyCartItemSelected: boolean;
  onToggleCartItem: (id: number) => void;
  onSelectAllCartItems: () => void;
  onRemoveSelectedCartItems: () => void;
  onDeleteCartItem: (id: number) => void;
  onUpdateCartItemQuantity: (id: number, delta: number) => void;
  onToggleWishItem: (id: number) => void;
  onSelectAllWishItems: () => void;
  onRemoveSelectedWishItems: () => void;
  onDeleteWishItem: (id: number) => void;
  onAddWishItemToCart: (item: WishItem) => void;
};

export default function ProfileWishCartSection({
  activeTab,
  onTabChange,
  cartItems,
  wishItems,
  isAnyCartItemSelected,
  onToggleCartItem,
  onSelectAllCartItems,
  onRemoveSelectedCartItems,
  onDeleteCartItem,
  onUpdateCartItemQuantity,
  onToggleWishItem,
  onSelectAllWishItems,
  onRemoveSelectedWishItems,
  onDeleteWishItem,
  onAddWishItemToCart,
}: ProfileWishCartSectionProps): React.JSX.Element {
  return (
    <>
      <div className={styles.combinedTabList} role="tablist" aria-label="장바구니 또는 찜">
        <button
          type="button"
          role="tab"
          id="combined-tab-cart"
          aria-selected={activeTab === "cart"}
          aria-controls="combined-panel-cart"
          className={`${styles.combinedTabButton} ${activeTab === "cart" ? styles.combinedTabButtonActive : ""}`}
          onClick={() => onTabChange("cart")}
        >
          장바구니 ({cartItems.length})
        </button>
        <button
          type="button"
          role="tab"
          id="combined-tab-wish"
          aria-selected={activeTab === "wish"}
          aria-controls="combined-panel-wish"
          className={`${styles.combinedTabButton} ${activeTab === "wish" ? styles.combinedTabButtonActive : ""}`}
          onClick={() => onTabChange("wish")}
        >
          찜 ({wishItems.length})
        </button>
      </div>

      <article
        className={styles.itemCard}
        role="tabpanel"
        id="combined-panel-cart"
        aria-labelledby="combined-tab-cart"
        hidden={activeTab !== "cart"}
      >
        <div className={styles.cartHeader}>
          <h3 className={styles.itemTitle}>장바구니 ({cartItems.length})</h3>
          <div className={styles.cartHeaderActions}>
            <button type="button" className={styles.secondarySmallButton} onClick={onSelectAllCartItems}>
              전체선택
            </button>
            <button type="button" className={styles.secondarySmallButton} onClick={onRemoveSelectedCartItems}>
              선택 삭제
            </button>
          </div>
        </div>

        <ul className={styles.productList}>
          {cartItems.map((item: CartItem) => (
            <li key={item.id} className={styles.productRow}>
              <label className={styles.checkboxWrap}>
                <span className={styles.srOnly}>{item.name} 선택</span>
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => onToggleCartItem(item.id)}
                  aria-label={`${item.name} 선택`}
                />
              </label>

              <div className={styles.productWrapper}>
                <div className={styles.productImage}>{item.imageText}</div>

                <div className={styles.productInfo}>
                  <p className={styles.productName}>
                    <Link href={item.href} className={styles.productNameLink}>
                      {item.name}
                    </Link>
                  </p>

                  <p className={styles.productPrice}>{formatPrice(item.price)}</p>

                  <div className={styles.quantityControl} role="group" aria-label={`${item.name} 수량 조절`}>
                    <span className={styles.productCount}>개수</span>

                    <div>
                      <button
                        type="button"
                        className={styles.quantityButton}
                        onClick={() => onUpdateCartItemQuantity(item.id, -10)}
                        disabled={item.quantity <= 1}
                        aria-label={`${item.name} 수량 10개 감소`}
                      >
                        -10
                      </button>
                      <button
                        type="button"
                        className={styles.quantityButton}
                        onClick={() => onUpdateCartItemQuantity(item.id, -5)}
                        disabled={item.quantity <= 1}
                        aria-label={`${item.name} 수량 5개 감소`}
                      >
                        -5
                      </button>
                      <button
                        type="button"
                        className={styles.quantityButton}
                        onClick={() => onUpdateCartItemQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                        aria-label={`${item.name} 수량 1개 감소`}
                      >
                        -
                      </button>
                    </div>

                    <span className={styles.quantityValue} aria-live="polite">
                      {item.quantity}
                    </span>

                    <div>
                      <button
                        type="button"
                        className={styles.quantityButton}
                        onClick={() => onUpdateCartItemQuantity(item.id, 1)}
                        disabled={item.quantity >= 100}
                        aria-label={`${item.name} 수량 1개 증가`}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className={styles.quantityButton}
                        onClick={() => onUpdateCartItemQuantity(item.id, 5)}
                        disabled={item.quantity >= 100}
                        aria-label={`${item.name} 수량 5개 증가`}
                      >
                        +5
                      </button>
                      <button
                        type="button"
                        className={styles.quantityButton}
                        onClick={() => onUpdateCartItemQuantity(item.id, 10)}
                        disabled={item.quantity >= 100}
                        aria-label={`${item.name} 수량 10개 증가`}
                      >
                        +10
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.secondarySmallButton}
                    onClick={() => onDeleteCartItem(item.id)}
                  >
                    장바구니에서 삭제
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Button disabled={!isAnyCartItemSelected} className={styles.purchaseButton}>
          구매하기
        </Button>
      </article>

      <article
        className={styles.itemCard}
        role="tabpanel"
        id="combined-panel-wish"
        aria-labelledby="combined-tab-wish"
        hidden={activeTab !== "wish"}
      >
        <div className={styles.cartHeader}>
          <h3 className={styles.itemTitle}>찜 ({wishItems.length})</h3>
          <div className={styles.cartHeaderActions}>
            <button type="button" className={styles.secondarySmallButton} onClick={onSelectAllWishItems}>
              전체선택
            </button>
            <button type="button" className={styles.secondarySmallButton} onClick={onRemoveSelectedWishItems}>
              선택 삭제
            </button>
          </div>
        </div>
        <ul className={styles.productList}>
          {wishItems.map((item: WishItem) => (
            <li key={item.id} className={styles.productRow}>
              <label className={styles.checkboxWrap}>
                <span className={styles.srOnly}>{item.name} 선택</span>
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => onToggleWishItem(item.id)}
                  aria-label={`${item.name} 선택`}
                />
              </label>

              <div className={styles.productWrapper}>
                <div className={styles.productImage}>{item.imageText}</div>

                <div className={styles.productInfo}>
                  <p className={styles.productName}>
                    <Link href={item.href} className={styles.productNameLink}>
                      {item.name}
                    </Link>
                  </p>
                  <p className={styles.productPrice}>{formatPrice(item.price)}</p>
                  <div className={styles.productActions}>
                    <button
                      type="button"
                      className={styles.secondarySmallButton}
                      onClick={() => onDeleteWishItem(item.id)}
                    >
                      삭제
                    </button>
                    <button
                      type="button"
                      className={styles.primarySmallButton}
                      onClick={() => onAddWishItemToCart(item)}
                    >
                      장바구니 담기
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
