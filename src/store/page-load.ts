import { create } from "zustand"

// type DeleteMessageStore = {
//     deleteMessage: {
//         id: string
//         email: string
//         status: boolean
//     }
//     setDeleteMessage: (message: { id: string; email: string; status: boolean }) => void
// }

// export const useDeleteMessageStore = create<DeleteMessageStore>((set) => ({
//     deleteMessage: {
//         id: "",
//         email: "",
//         status: false,
//     },
//     setDeleteMessage: (message) => set({ deleteMessage: message }),
// }))

// 判斷頁面選染完畢

type PageLoadStore = {
  pageLoad: boolean
  setPageLoad: (status: boolean) => void
}

export const usePageLoadStore = create<PageLoadStore>((set) => ({
  pageLoad: false,
  setPageLoad: (status) => set({ pageLoad: status })
}))
