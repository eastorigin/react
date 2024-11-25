/**
 * Redux-Toolkit
 * 하나의 거대한 store에 주제별로 작은 slice-store를 만들어 관리한다.
 * 주제별 slice-store를 만들고 하나의 store에 할당시켜 관리하는 방식을 취한다.
 *
 * slice-store마다 reducer를 생성해야 하고
 * 완성된 reducer는 action 객체로 참조가능하다.
 *
 * 개발 중 store를 확장할 필요가 있을 경우 slice-store만 만들면 된다.
 */

import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// article 전용 slice-store 만들기
const articleSliceStore = createSlice({
  // slice-store를 구분지을 유일 값.
  name: "article-slice",
  // article-slice-store가 기본으로 가질 state 기본 값
  initialState: {
    pageNo: 0,
    data: [],
  },
  // article-slice-store를 변경시킬 함수들
  reducers: {
    write(articleState, articleAction) {
      const payload = articleAction.payload;
      articleState.data.unshift({
        id: -1,
        subject: payload.subject,
        content: payload.content,
        email: payload.email,
        viewCnt: 0,
        memberVO: {
          email: payload.email,
          name: payload.name,
        },
      });
    },
    clear() {
      return {
        pageNo: 0,
        data: [],
      };
    },
    updatePageNo(articleState, articleAction) {
      articleState.pageNo = articleAction.payload;
    },
    readList(articleState, articleAction) {
      for (let i = 0; i < articleAction.payload.body.length; i++) {
        const newArticle = articleAction.payload.body[i];

        let existsArticle = false;
        for (const prevArticle of articleState.data) {
          if (prevArticle.id === newArticle.id) {
            existsArticle = true;
            break;
          }
        }
        if (!existsArticle) {
          articleState.data.push(newArticle);
        }
      }
      // 배열의 마지막에 데이터를 덧붙인다
      // articleState.push(...articleAction.payload.body);
    },
  },
});

// member slice-store
const memberSliceStore = createSlice({
  name: "member-slice",
  initialState: {},
  reducers: {
    reload(memberState) {
      const token = sessionStorage.getItem("token", memberAction.payload);
      const info = JSON.parse(
        sessionStorage.getItem("info", JSON.stringify(memberAction.payload))
      );
      memberState.token = token;
      memberState.info = info;
    },
    setToken(memberState, memberAction) {
      memberState.token = memberAction.payload;
      sessionStorage.setItem("token", memberAction.payload);
    },
    setMyInfo(memberState, memberAction) {
      memberState.info = memberAction.payload;
      sessionStorage.setItem("info", JSON.stringify(memberAction.payload));
    },
    clearMember(memberState, memberAction) {
      memberState.token = { undefined };
      memberState.info = {};
      sessionStorage.clear();
    },
  },
});

// redux store 만들기
const store = configureStore({
  // redux store 내부에 slice store를 적재.
  reducer: {
    // store.article = [] + reducers 함수들
    article: articleSliceStore.reducer,
    // store.member = {} + reducers 함수들
    member: memberSliceStore.reducer,
  },
});

// articleAction.write({...........})
export const articleAction = articleSliceStore.actions;
// memberAction.setToken({............})
export const memberAction = memberSliceStore.actions;

// redux slice store들을 제공
export function AppProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
