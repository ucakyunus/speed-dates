/* eslint-disable react/display-name */
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedMaskedView = Animated.createAnimatedComponent(MaskedView);

const messages = [
  {
    dialog: 1,
    title: "Merhaba, yabancı! Buralarda yeni misin?",
    responses: [
      {
        key: "1",
        response: "Selam! Yeni sayılırım, peki ya sen? 😊",
        answer: "Evet, buralarda yeniyim.",
      },
      {
        key: "2",
        response:
          "Merhaba! Evet, biraz keşifteyim. Sen rehber olabilir misin? 😏",
        answer: "Tabii, size rehberlik edebilirim.",
      },
      {
        key: "3",
        response: "Yeni olabilirim ama hızlı öğrenirim. Sana uyum sağlarım. 😌",
        answer: "Harika, birlikte öğrenebiliriz.",
      },
    ],
  },
  {
    dialog: 2,
    title: "Eskilerden sayılırım ama hala herkes beni çözmeye çalışıyor. 😏",
    responses: [
      {
        key: "1",
        response: "Bu bir meydan okuma mı? Çünkü çözmeyi severim. 😄",
        answer: "Evet, bu bir meydan okuma.",
      },
      {
        key: "2",
        response: "İlginç… Çözülmesi zor bir bilmecesin demek. 😏",
        answer: "Kesinlikle öyle!",
      },
      {
        key: "3",
        response:
          "Hmm, o zaman seni çözmek için ekstra çaba göstermem gerekecek galiba. 😊",
        answer: "Evet, biraz uğraşman gerekebilir.",
      },
    ],
  },
  {
    dialog: 3,
    title:
      "Belki de. Ama beni çözmek için yüz yüze bir şans vermen gerek. Ne dersin? 😊",
    responses: [
      {
        key: "1",
        response: "Tabii ki! Bir kahveyle başlayalım mı? ☕",
        answer: "Evet, bir kahve güzel olur.",
      },
      {
        key: "2",
        response: "Hmm, belki bir yürüyüş planlayabiliriz? 🌳",
        answer: "Yürüyüş harika bir fikir.",
      },
      {
        key: "3",
        response: "Çok meraklandım. Akşam yemeği nasıl olur? 🍽️",
        answer: "Akşam yemeği harika olur.",
      },
    ],
  },
  {
    dialog: 4,
    title: "Selam, burada eğlence nerede bulunur bilgin var mı? 😜",
    responses: [
      {
        key: "1",
        response: "Selam! Eğlence benim yanımda başlar. 😎",
        answer: "Harika, o zaman birlikte eğlenelim.",
      },
      {
        key: "2",
        response: "Doğru kişiye denk geldin! Planlarımı paylaşayım mı? 😏",
        answer: "Evet, planlarını duymak isterim.",
      },
      {
        key: "3",
        response: "Eğlence mi? Ben tam adresim, merak etme. 😊",
        answer: "O zaman birlikte bir şeyler yapalım.",
      },
    ],
  },
  {
    dialog: 5,
    title: "Hmm, kendine güvenen biriyle karşı karşıyayım. İyiymiş! 😏",
    responses: [
      {
        key: "1",
        response:
          "Kendime güvenmek benim işim. Ama seni eğlendirmek daha önemli. 😉",
        answer: "Hadi eğlenceli bir şey yapalım.",
      },
      {
        key: "2",
        response: "Güzel! O zaman bu güvenle sana bir plan yapayım. 😌",
        answer: "Planını sabırsızlıkla bekliyorum.",
      },
      {
        key: "3",
        response:
          "İyi ki karşına çıkmışım, o zaman biraz aksiyon ekleyelim mi? 😏",
        answer: "Evet, aksiyon tam bana göre.",
      },
    ],
  },
  {
    dialog: 6,
    title:
      "O zaman bu fırsatı kaçırmayalım, dışarıda bir şeyler yapalım mı? 😊",
    responses: [
      {
        key: "1",
        response: "Sinema mı, bowling mi? Hadi seç! 🎬🎳",
        answer: "Bowling çok eğlenceli olur.",
      },
      {
        key: "2",
        response: "Hadi çay içelim, biraz sohbet edelim. ☕",
        answer: "Çay içmek güzel bir fikir.",
      },
      {
        key: "3",
        response: "Macerayı seviyorsan paintball oynayalım. 😈",
        answer: "Paintball mükemmel olur.",
      },
    ],
  },
  {
    dialog: 7,
    title: "Merhaba, tahmin edebilir misin, favori rengim ne? 🤔",
    responses: [
      {
        key: "1",
        response: "Kolay, kırmızı. Çünkü tutkulusun. 😏",
        answer: "Evet, kırmızı doğru cevap.",
      },
      {
        key: "2",
        response: "Hmm, mavi diyebilirim. Sakin ama derin. 😊",
        answer: "Evet, mavi benim favorim.",
      },
      {
        key: "3",
        response: "Bana göre bu kesinlikle siyah. Güçlü ve gizemlisin. 😌",
        answer: "Doğru tahmin, siyah benim rengim.",
      },
    ],
  },
  {
    dialog: 8,
    title: "Vay, bildin! Ama nasıl? 😲",
    responses: [
      {
        key: "1",
        response: "Sezgilerim kuvvetlidir, doğru hissetmişim. 😏",
        answer: "Evet, sezgilerin çok iyi.",
      },
      {
        key: "2",
        response: "Sadece gözlemledim, tahmin değil gerçeği söyledim. 😊",
        answer: "Gözlemlerin gerçekten etkileyici.",
      },
      {
        key: "3",
        response: "Çünkü insanlar düşündüğünden daha fazla şey anlatır. 😌",
        answer: "Bu çok doğru, insanlar çok şey anlatıyor.",
      },
    ],
  },
  {
    dialog: 9,
    title:
      "Hmm, o zaman bu tutkuyu gerçek hayatta görmek isterim. Bir buluşma ayarlayalım mı? 😊",
    responses: [
      {
        key: "1",
        response: "Tabii! Sahilde yürüyüş mü yapalım? 🌊",
        answer: "Sahilde yürüyüş mükemmel olur.",
      },
      {
        key: "2",
        response: "Akşamüstü bir kafede buluşabiliriz. ☕",
        answer: "Kafede buluşmak harika bir fikir.",
      },
      {
        key: "3",
        response: "Harika fikir! Ama bir şartla, ilk tur kahve benden. 😋",
        answer: "Anlaştık, kahve senden olsun.",
      },
    ],
  },
];

function generateUUID() {
  // Simple UUID generation function (not RFC compliant)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default () => {
  const [measures, setMeasures] = React.useState({ height });
  const [entities, setEntities] = React.useState<
    { key: string; text: string; mine: boolean }[]
  >([]);
  const [isWriting, setIsWriting] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  // const aRef = useAnimatedRef();
  // const onScroll = useScrollViewOffset(aRef);
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });
  // If you don't like inline-styles with Reanimated, add this style to the AnimatedLinearGradientInstead.
  const gradientStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: scrollY.value,
        },
      ],
    };
  });

  const addNewMessage = React.useCallback(
    (isMine: boolean) => {
      const message = messages.find((m) => m.dialog === currentIndex + 1);
      console.log("🚀 ~ message:", message);
      if (!message) return;

      const mapped = {
        key: generateUUID(),
        text: message.title,
        mine: isMine,
      };

      setEntities((prevEntities) => [
        ...prevEntities,
        mapped as { key: string; text: string; mine: boolean },
      ]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    },
    [currentIndex],
  );

  useEffect(() => {
    setIsWriting(true);
    setTimeout(() => {
      addNewMessage(false);
      setIsWriting(false);
    }, 1000);
  }, [addNewMessage]);

  //   useEffect(() => {
  //     addNewMessage(false);
  //   }, []);

  return (
    <Animated.ScrollView
      onScroll={onScroll}
      scrollEventThrottle={1000 / 60} // ~16.66
      style={{ backgroundColor: "transparent" }}
    >
      <AnimatedMaskedView
        renderToHardwareTextureAndroid
        maskElement={
          <View
            renderToHardwareTextureAndroid
            onLayout={(ev) => setMeasures(ev.nativeEvent.layout)}
            style={{ backgroundColor: "transparent" }}
          >
            {entities.map((item) => (
              <View
                key={item.key}
                style={[
                  styles.messageItem,
                  {
                    backgroundColor: "#fff", // Important to apply the gradient effect as a mask
                    alignSelf: item.mine ? "flex-end" : "flex-start",
                  },
                ]}
              >
                <Text style={{ opacity: 0 }}>{item.text}</Text>
              </View>
            ))}
            {isWriting && (
              <ActivityIndicator
                size="small"
                color="#0000ff"
                style={{ alignSelf: "center", marginVertical: 10 }}
              />
            )}
          </View>
        }
      >
        <View style={{ height: measures.height }}>
          <FlatList
            scrollEnabled={false}
            data={entities}
            keyExtractor={(item) => item.key}
            style={[StyleSheet.absoluteFillObject, { zIndex: 1 }]}
            removeClippedSubviews={true}
            renderItem={({ item }) => {
              return (
                <View
                  style={[
                    styles.messageItem,
                    {
                      zIndex: item.mine ? -1 : 1, // only display the other messages above the gradient mask, we want to avoid gradient being applied to the other message other than mine.
                      backgroundColor: item.mine ? "transparent" : "#E4E7EB", // remove the background for my messages because we're using the gradient mask
                      alignSelf: item.mine ? "flex-end" : "flex-start",
                    },
                  ]}
                >
                  <Text style={{ color: item.mine ? "white" : "#111927" }}>
                    {item.text}
                  </Text>
                </View>
              );
            }}
          />
          <AnimatedLinearGradient
            style={[
              {
                height,
                // Comment this if you are using useAnimatedStyle
                // This is for inline-styling using Reanimated.
                // transform: [
                //   {
                //     translateY: onScroll,
                //   },
                // ],
              },
              // uncomment this if you're using useAnimatedStyle style.
              gradientStyle,
            ]}
            colors={["#FD84AA", "#A38CF9", "#09E0FF"]}
          />
        </View>
      </AnimatedMaskedView>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  messageItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    margin: 12,
    marginBottom: 8,
    borderRadius: 12,
    maxWidth: width * 0.65,
  },
});
