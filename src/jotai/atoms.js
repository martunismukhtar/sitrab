import { atom } from "jotai"

export const isOpenModal = atom(false);
export const activeModalAtom = atom(null);
export const cursorAtom = atom('default');
export const isDrawingAtom = atom(false);
export const isClickable = atom(false);

export const coordinatesAtom = atom([]);
export const layersAtom = atom([{
    layer:"pola_ruang", title:"Pola Ruang", visible:true
}, {
    layer:"rdtr", title:"RDTR", visible:false
}]);

export const list_layersAtom = atom([]);
export const list_selectedClassAtom = atom([]);

export const layersMapAtom = atom([]);

export const initialExtentAtom = atom([]);
export const initialMapSizeAtom = atom([]);
export const initialResolutionAtom = atom(0);
export const isVisibleModal = atom('');

export const form_pengajuan_atom = atom({
    pengaju: "",
    nomor_hp: "",
    email: "",
    tujuan: "",
    kegiatan: "",
    koordinat: []
});
export const hasil_intersect_atom = atom('');

export const isLoadingAtom = atom(false)
export const isLoadingUploadAtom = atom(false)

export const setVisibleToast = atom({
    visible: false,
    message: "",
    type: ""
})

export const tooglePanelAtom = atom(true);
