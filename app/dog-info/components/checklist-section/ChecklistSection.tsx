"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { useScrollAnimation } from "../../lib/use-scroll-animation";
import styles from "./checklist-section.module.scss";
import { CheckList } from "../../page";
import { useAuth } from "@/providers/AuthContext";
import { UserCheckList } from "@/hooks/useUserCheckList";

const TIPS = [
  {
    emoji: "💡",
    tip: "강아지가 이름을 부를 때마다 쳐다보면 즉시 간식을 주세요. 이름=좋은 일이라고 학습됩니다.",
  },
  {
    emoji: "⏰",
    tip: "배변 훈련은 아침 기상 후, 식사 후 15-30분, 낮잠 후가 적기입니다.",
  },
  {
    emoji: "🎯",
    tip: '명령어는 짧고 일관되게! "앉아"는 늘 "앉아"로만 사용하세요.',
  },
];

type ChecklistSectionProps = {
  items: CheckList[];
  userCheckList: UserCheckList[] | undefined;
  checkedItems: string[];
  onToggleItem: (id: string, isUser: boolean) => void;
};

export default function ChecklistSection({
  items,
  userCheckList,
  checkedItems,
  onToggleItem,
}: ChecklistSectionProps) {
  const gridRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const auth = useAuth();
  const isLogin = !!auth?.user;
  const progress = isLogin ? userCheckList?.length : checkedItems.length;

  return (
    <section id="dog-info-checklist" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid} ref={gridRef}>
          {/* Checklist card */}
          <div
            className={styles.card}
            data-animate="hidden"
            style={{ "--delay": "0ms" } as React.CSSProperties}
          >
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>오늘의 체크리스트</h2>
              <p className={styles.cardSubtitle}>
                매일 실천할 수 있는 기본 루틴을 체크해보세요
              </p>
              <span className={styles.cardNotify}>※ 비로그인 상태로 체크 시 저장이 불가능합니다 ※</span>
            </div>
            <ul className={styles.list}>
              {(items ?? []).map((item) => {
                const checked = isLogin ? 
                userCheckList?.some((checklist) => 
                  checklist.checklist_id === item.id
                ) : checkedItems.includes(item.id);

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onToggleItem(item.id, isLogin)}
                      className={`${styles.listItem} ${
                        checked ? styles.checked : ""
                      }`}
                    >
                      {checked ? (
                        <CheckCircle2
                          width={20}
                          height={20}
                          className={styles.iconChecked}
                        />
                      ) : (
                        <Circle
                          width={20}
                          height={20}
                          className={styles.iconUnchecked}
                        />
                      )}
                      <span className={styles.itemText}>{item.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className={styles.progress}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ "--progress": `${(progress ?? 0 / items?.length) * 20}%` } as React.CSSProperties}
                />
              </div>
              <p className={styles.progressLabel}>
                <span className={styles.progressCount}>
                  {(progress ?? 0)}
                </span>{" "}
                / {items?.length} 완료
              </p>
            </div>
          </div>

          {/* Tips card */}
          <div
            className={`${styles.card} ${styles.tipsCard}`}
            data-animate="hidden"
            style={{ "--delay": "150ms" } as React.CSSProperties}
          >
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>오늘의 팁</h2>
              <p className={styles.cardSubtitle}>
                초보 보호자를 위한 실용 팁
              </p>
            </div>
            <div className={styles.tips}>
              {TIPS.map((item, index) => (
                <div key={index} className={styles.tipItem}>
                  <span className={styles.tipEmoji}>{item.emoji}</span>
                  <p className={styles.tipText}>{item.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
