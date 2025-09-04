import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

st.set_page_config(
    page_title="体験して学ぶ！情報デザインの世界",
    page_icon="🎨",
    layout="wide"
)

st.title("体験して学ぶ！情報デザインの世界 🎨")
st.caption("Created by Dit-Lab.(Daiki ITO)")
st.caption("Supported by Tomoaki ATSUMI")

st.markdown("---")

# ステップ1: はじめに - 情報デザインってなんだろう？
st.header("ステップ1: はじめに - 情報デザインってなんだろう？ 🤔")
st.subheader("情報デザインへようこそ！")
st.write("""
たくさんの情報があふれる世界で、伝えたいことを「正しく」「分かりやすく」「魅力的に」伝える技術が情報デザインです。
このアプリで、その基本を体験してみましょう！
""")

st.markdown("---")

# ステップ2: 3つの基本テクニックを体験しよう！
st.header("ステップ2: 3つの基本テクニックを体験しよう！")
st.subheader("基本テクニック：抽象化・可視化・構造化")

# 2-1. 抽象化
st.markdown("### 2-1. 抽象化 (Abstraction): 大事なことだけ、シンプルに。")
st.markdown("#### ① 抽象化：情報のエッセンスを抜き出す")

st.write("""
以下の天気予報の文章から、あなたが「一番大事だ」と思う情報を一つだけ選んでください。

**今日の東京地方の天気は、朝のうちは晴れますが、昼過ぎから雲が多くなり、ところにより一時的に雨が降るでしょう。
最高気温は28度、最低気温は20度で、日中は少し汗ばむ陽気となりそうです。
降水確率は午前中が10%、午後が40%です。風は南西の風がやや強く吹く見込みです。**
""")

weather_choice = st.radio(
    "一番伝えたいことは？",
    ["晴れのち曇り、時々雨", "最高気温28度", "降水確率40%"]
)

if st.button("アイコンで表示する"):
    if weather_choice == "晴れのち曇り、時々雨":
        st.write("🌤️ → ☁️ → 🌦️")
        st.success("天気の変化を分かりやすく表現できました！")
    elif weather_choice == "最高気温28度":
        st.write("🌡️ 28°C")
        st.success("温度を視覚的に表現できました！")
    else:
        st.write("☔ 40%")
        st.success("雨の可能性を分かりやすく表現できました！")
    
    st.info("""
    **これが抽象化です！** たくさんの情報から最も重要な要素を抜き出し、ピクトグラムやアイコンのように
    単純な形で表現することで、一瞬で意味が伝わるようになります。
    """)

st.markdown("---")

# 2-2. 可視化
st.markdown("### 2-2. 可視化 (Visualization): パッと見てわかる形に。")
st.markdown("#### ② 可視化：データを「見る」")

st.write("""
あるカフェの、曜日ごとのコーヒー販売数です。どの曜日が一番売れているか、すぐに分かりますか？

**月: 65杯, 火: 72杯, 水: 68杯, 木: 85杯, 金: 110杯, 土: 152杯, 日: 145杯**
""")

if st.button("グラフで見てみる！"):
    data = {
        '曜日': ['月', '火', '水', '木', '金', '土', '日'],
        '販売数': [65, 72, 68, 85, 110, 152, 145]
    }
    df = pd.DataFrame(data)
    
    fig = px.bar(df, x='曜日', y='販売数', 
                 title='カフェの曜日別コーヒー販売数',
                 color='販売数',
                 color_continuous_scale='Blues')
    fig.update_layout(height=400)
    st.plotly_chart(fig, use_container_width=True)
    
    st.info("""
    **これが可視化です！** 数字の羅列をグラフにすることで、どの曜日が一番売れているか、
    週末に売上が急増する傾向などが一目で分かりますね。
    """)

st.markdown("---")

# 2-3. 構造化
st.markdown("### 2-3. 構造化 (Structuring): 関係性で整理する。")
st.markdown("#### ③ 構造化：情報の関係を整理する")

st.write("""
以下の言葉は、バラバラに並んでいます。

**動物, 哺乳類, 犬, 柴犬, 猫, 脊椎動物, 三毛猫**
""")

if st.button("関係性を整理する"):
    st.graphviz_chart('''
        digraph {
            rankdir=TB;
            node [shape=box, style=filled, fillcolor=lightblue];
            
            "動物" -> "脊椎動物"
            "脊椎動物" -> "哺乳類"
            "哺乳類" -> "犬"
            "哺乳類" -> "猫"
            "犬" -> "柴犬"
            "猫" -> "三毛猫"
        }
    ''')
    
    st.info("""
    **これが構造化です！** 情報に上下関係やグループのつながりを与えることで、
    全体の構造が理解しやすくなります。Webサイトのメニューなども、この考え方で作られています。
    """)

st.markdown("---")

# ステップ3: 伝わる「型」を使ってみよう！
st.header("ステップ3: 伝わる「型」を使ってみよう！ ✍️")
st.subheader("PREP法で説得力アップ")

st.write("""
PREP法は、「結論 → 理由 → 具体例 → 結論」の順番で話を構成するフレームワークです。
説得力のある文章を簡単に作れます。あなたの考えをPREP法で組み立ててみましょう！
""")

col1, col2 = st.columns([1, 1])

with col1:
    st.markdown("**入力フォーム**")
    point = st.text_input("P (Point): あなたの結論は？", placeholder="例：運動は健康に良い")
    reason = st.text_input("R (Reason): その理由は？", placeholder="例：体力向上と病気予防効果があるから")
    example = st.text_area("E (Example): 具体的なエピソードやデータは？", 
                          placeholder="例：週3回のジョギングで血圧が改善した")

with col2:
    if st.button("文章を組み立てる") and point and reason and example:
        st.markdown("**あなたの主張**")
        st.markdown(f"""
        **【結論】**  
        {point}
        
        **【理由】**  
        なぜなら、{reason}からです。
        
        **【具体例】**  
        例えば、{example}ということがあります。
        
        **【再結論】**  
        以上のことから、私は{point}と考えます。
        """)
        st.success("PREP法で整理された説得力のある文章が完成しました！")

st.markdown("---")

# ステップ4: いろいろな情報の整理術
st.header("ステップ4: いろいろな情報の整理術 🗺️")
st.subheader("目的に合わせた情報の整理")

tab1, tab2, tab3 = st.tabs(["分類図", "循環図", "マトリックス図"])

with tab1:
    st.markdown("### 分類図")
    st.write("**解説：** 全体を、漏れなく・重なりなく部分に分けるときに使います。")
    st.write("**例：** 通学手段を「電車」「バス」「自転車」に分けるようなイメージです。")
    
    # 分類図の例
    fig = go.Figure(go.Treemap(
        labels=["通学手段", "電車", "バス", "自転車", "JR", "私鉄", "路線バス", "スクールバス", "ママチャリ", "ロードバイク"],
        parents=["", "通学手段", "通学手段", "通学手段", "電車", "電車", "バス", "バス", "自転車", "自転車"],
        values=[10, 4, 3, 3, 2, 2, 1.5, 1.5, 1.5, 1.5],
    ))
    fig.update_layout(title="通学手段の分類図", height=400)
    st.plotly_chart(fig, use_container_width=True)

with tab2:
    st.markdown("### 循環図")
    st.write("**解説：** 繰り返されるプロセスや手順を表すのに便利です。")
    st.write("**例：** 「計画(Plan)→実行(Do)→評価(Check)→改善(Action)」を繰り返すPDCAサイクルが有名です。")
    
    # PDCAサイクルの例
    st.graphviz_chart('''
        digraph {
            rankdir=LR;
            node [shape=circle, style=filled, fillcolor=lightgreen, fontsize=12];
            
            "Plan\n計画" -> "Do\n実行"
            "Do\n実行" -> "Check\n評価"
            "Check\n評価" -> "Action\n改善"
            "Action\n改善" -> "Plan\n計画"
        }
    ''')

with tab3:
    st.markdown("### マトリックス図")
    st.write("**解説：** 「価格」と「品質」のように、2つの異なる軸で物事を整理・比較するときに使います。")
    st.write("**例：** パソコンを「価格（安い⇔高い）」と「スペック（低い⇔高い）」の2軸で整理し、どの製品がどの位置にあるかを示します。")
    
    # マトリックス図の例
    pc_data = pd.DataFrame({
        '製品名': ['エントリーモデル', 'ミドルレンジ', 'ハイエンド', 'ゲーミングPC', 'ウルトラブック'],
        '価格': [3, 6, 9, 8, 7],
        'スペック': [3, 6, 9, 9, 6]
    })
    
    fig = px.scatter(pc_data, x='価格', y='スペック', text='製品名',
                     title='パソコンの価格とスペックの関係',
                     labels={'価格': '価格（安い ← → 高い）', 'スペック': 'スペック（低い ← → 高い）'})
    fig.update_traces(textposition="top center", marker=dict(size=12))
    fig.update_layout(height=500)
    st.plotly_chart(fig, use_container_width=True)

st.markdown("---")

# ステップ5: まとめ
st.header("ステップ5: まとめ")
st.subheader("お疲れ様でした！")

st.write("""
情報デザインの基本を体験していただきました。

- **抽象化**で、本質をシンプルに。
- **可視化**で、直感的な理解を。
- **構造化**で、関係性をクリアに。

これらのテクニックを、これからの資料作りやプレゼンテーションにぜひ活かしてみてください！ 🎉
""")

st.balloons()

st.markdown("---")
st.markdown("**Thank you for learning with us!**")