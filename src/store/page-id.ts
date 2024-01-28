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

type PageIdStore = {
  pageId: string
  setPageId: (pageId: string) => void
}

export const usePageIdStore = create<PageIdStore>((set) => ({
  pageId: "",
  setPageId: (pageId) => set({ pageId })
}))
