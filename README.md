# 🏋️‍♂️ Workout Tracker - Mobile

Um aplicativo minimalista e funcional para acompanhamento de séries de musculação em tempo real, desenvolvido com React Native e Expo.

## ✨ Funcionalidades Atuais
- **Contador Independente:** Cada exercício possui seu próprio controle de séries.
- **Interface Dark Mode:** Design otimizado para ambientes de academia.
- **Indicadores de Status:** Feedback visual (Vermelho, Laranja, Verde) baseado no progresso.
- **Lógica de Segurança:** Travas que impedem séries negativas ou acima do limite estipulado.
- **Feedback de Conclusão:** Texto riscado e botões desabilitados ao finalizar o exercício.

## 🛠️ Tecnologias Utilizadas
- React Native
- Expo (Router & SDK)
- TypeScript
- React Native Safe Area Context

## 🚀 Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install

2. Inicie o servidor do Expo:
   ```bash
   npx expo start
   
3. Escaneie o QR Code com o app Expo Go (Android/iOS) ou use um emulador.

## 📈 Próximos Passos

    [ ] Refatorar Item para um componente separado.

    [ ] Implementar persistência local com AsyncStorage.

    [ ] Criar fluxo de criação/edição de treinos.
