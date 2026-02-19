import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="app-container">
      <div className="flex flex-col min-h-dvh px-6 py-8">
        <header className="flex items-center gap-3 mb-8">
          <Link
            href="/"
            className="w-10 h-10 rounded-xl flex items-center justify-center active:opacity-75"
            style={{ background: "var(--color-surface)" }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" style={{ color: "var(--color-accent)" }} />
            <span className="font-bold">隐私声明</span>
          </div>
        </header>

        <div className="flex flex-col gap-6 text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
          <section>
            <h2 className="font-bold text-white mb-3 text-base">核心承诺</h2>
            <div
              className="p-4 rounded-2xl"
              style={{ background: "rgba(34,197,94,0.08)", border: "1px solid var(--color-success)" }}
            >
              <p style={{ color: "var(--color-success)" }} className="font-medium">
                你的声音不离开你的设备
              </p>
              <p className="mt-2">
                所有音频分析在浏览器本地完成。原始录音不上传到任何服务器。
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-bold text-white mb-3 text-base">我们不收集的数据</h2>
            <div className="flex flex-col gap-2">
              {[
                "原始音频录音",
                "个人身份信息（无账号系统）",
                "位置信息",
                "设备追踪标识符",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span style={{ color: "var(--color-danger)" }}>✕</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-bold text-white mb-3 text-base">本地存储</h2>
            <p>以下数据仅保存在你的设备上（LocalStorage），不传输到服务器：</p>
            <div className="flex flex-col gap-2 mt-3">
              {[
                "训练进度（已完成的关卡）",
                "XP 积分和连胜天数",
                "赛道选择",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span style={{ color: "var(--color-success)" }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-3">清除浏览器数据即可删除所有本地记录。</p>
          </section>

          <section>
            <h2 className="font-bold text-white mb-3 text-base">分享功能</h2>
            <p>
              分享链接中仅包含匿名数字指标（评分、连胜天数），不包含原始音频，
              任何人都无法从这些数字还原你的声音。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white mb-3 text-base">健康与安全</h2>
            <div
              className="p-4 rounded-2xl"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid var(--color-danger)" }}
            >
              <p style={{ color: "var(--color-danger)" }} className="font-medium mb-2">
                重要提示
              </p>
              <p>
                声音训练应在舒适范围内进行。如出现喉咙疼痛、沙哑或不适，
                请立即停止并休息。如症状持续，请咨询医疗专业人士。
              </p>
            </div>
          </section>

          <p className="text-xs" style={{ color: "var(--color-muted)" }}>
            最后更新：2026-02-19 ·{" "}
            <a
              href="https://github.com/electricmpv/vocalmax/issues"
              className="underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              联系我们
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
