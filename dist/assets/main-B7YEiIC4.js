(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const ja="modulepreload",Ua=function(t){return"/"+t},wr={},Yt=function(e,n,i){let r=Promise.resolve();if(n&&n.length>0){let d=function(p){return Promise.all(p.map(c=>Promise.resolve(c).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var s=d;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");r=d(n.map(p=>{if(p=Ua(p),p in wr)return;wr[p]=!0;const c=p.endsWith(".css"),f=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${f}`))return;const u=document.createElement("link");if(u.rel=c?"stylesheet":ja,c||(u.as="script"),u.crossOrigin="",u.href=p,l&&u.setAttribute("nonce",l),document.head.appendChild(u),c)return new Promise((h,v)=>{u.addEventListener("load",h),u.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${p}`)))})}))}function o(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return r.then(a=>{for(const l of a||[])l.status==="rejected"&&o(l.reason);return e().catch(o)})},pe={jobs:[{id:"004- T1",jobNo:2,client:"Phuong Linh",date:"2026-01-17",phone:"0902190726",venue:"Nhà hàng GEM CENTER, 8 Nguyễn Bỉnh Khiêm, Đa Kao, Quận 1, Thành phố Hồ Chí Minh",package:13e6,deposit:26e5,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"QUAY PS",staff:"THỐNG",cost:3e6,paid:!0,edit:15e5,date:"2026-01-17"},{service:"CHỤP PS",staff:"TUẤN ANH",cost:25e5,paid:!0,edit:5e5,date:"2026-01-17"},{service:"CHỤP TT",staff:"LONG",cost:17e5,paid:!1,edit:3e5,date:"2026-01-17"}]},{id:"71- T9",jobNo:3,client:"Thuy Chi Nguyen",date:"2026-01-17",phone:"0908850066",venue:"TRUNG TÂM HỘI NGHỊ TIỆC CƯỚI THANH TÙNG, 99 Đ. số 9, Dĩ An, Bình Dương. ( TIỆC TRƯA)",package:36e6,deposit:89e5,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"QUAY PS",staff:"THỐNG",cost:3e6,paid:!0,edit:5e5,date:"2026-01-17"},{service:"CHỤP PS",staff:"HÙNG",cost:25e5,paid:!0,edit:5e5,date:"2026-01-17"},{service:"CHỤP TT",staff:"BÌNH",cost:19e5,paid:!1,edit:5e5,date:"2026-01-17"},{service:"QUAY PS",staff:"TRƯƠNG MINH",cost:3e6,paid:!1,edit:5e5,date:"2026-01-17"},{service:"CHỤP PS",staff:"BẢO",cost:25e5,paid:!0,edit:5e5,date:"2026-01-17"},{service:"CHỤP TT",staff:"BÌNH",cost:17e5,paid:!1,edit:5e5,date:"2026-01-17"},{service:"QUAY PS",staff:"ANH TRẦN",cost:3e6,paid:!1,edit:5e5,date:"2026-01-25"},{service:"CHỤP PS",staff:"BẢO",cost:25e5,paid:!0,edit:5e5,date:"2026-01-25"},{service:"CHỤP TT",staff:"MINH ĐỨC",cost:15e5,paid:!0,edit:5e5,date:"2026-01-25"},{service:"CHỤP PS",staff:"XUÂN",cost:2e6,paid:!1,edit:5e5,date:"2026-01-25"},{service:"CHỤP PS",staff:"XUÂN",cost:25e5,paid:!0,edit:5e5,date:"2026-01-25"},{service:"QUAY PS",staff:"NAM THẾ ANH",cost:3e6,paid:!0,edit:5e5,date:"2026-01-25"},{service:"QUAY PS",staff:"NAM THẾ ANH",cost:3e6,paid:!0,edit:5e5,date:"2026-01-25"},{service:"CHỤP TT",staff:"BÌNH",cost:17e5,paid:!1,edit:5e5,date:"2026-01-25"},{service:"CHỤP PS",staff:"XUÂN",cost:25e5,paid:!0,edit:5e5,date:"2026-01-25"},{service:"QUAY PS",staff:"NAM THẾ ANH",cost:3e6,paid:!0,edit:5e5,date:"2026-01-25"},{service:"QUAY PS",staff:"NAM THẾ ANH",cost:3e6,paid:!0,edit:5e5,date:"2026-01-25"},{service:"CHỤP TT",staff:"TIẾN",cost:17e5,paid:!0,edit:5e5,date:"2026-01-25"},{service:"CHỤP PS",staff:"HÙNG",cost:25e5,paid:!0,edit:5e5,date:"2026-01-25"},{service:"QUAY PS",staff:"NAM THẾ ANH",cost:3e6,paid:!0,edit:5e5,date:"2026-01-25"},{service:"QUAY PS",staff:"HIẾU",cost:3e6,paid:!1,edit:5e5,date:"2026-01-25"},{service:"CHỤP TT",staff:"NGHĨA",cost:17e5,paid:!1,edit:5e5,date:"2026-01-25"},{service:"QUAY DỌC TIKTOK",staff:"HIẾU",cost:0,paid:!1,edit:0,date:"2026-01-25"},{service:"CHỤP PS",staff:"THỐNG",cost:25e5,paid:!0,edit:5e5,date:"2026-01-25"},{service:"CHỤP TT",staff:"HIẾU",cost:24,paid:!1,edit:3e5,date:"2026-01-25"}],eventDays:[{date:"2026-01-17",timeline:{le:"",tiec:"",type:"both"}},{date:"2026-01-25",timeline:{le:"",tiec:"",type:"both"}}]},{id:"59-T7",jobNo:1,client:"Hà Mi",date:"2026-01-18",phone:"0396008914",venue:"Địa chỉ CD: 797 Xô Viết Nghệ Tĩnh P26 Q Bình Thạnh, Tp Hồ Chí Minh CR: Tp Hồng Ngự Địa chỉ nhà hàng: Nhà hàng Capella ParkView",package:204e5,deposit:408e4,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"QUAY PS",staff:"CAN",cost:3e6,paid:!1,edit:5e5,date:"2026-01-18"},{service:"QUAY TT",staff:"HIẾU",cost:2e6,paid:!1,edit:5e5,date:"2026-01-18"},{service:"CHỤP PS",staff:"XUÂN",cost:25e5,paid:!1,edit:5e5,date:"2026-01-18"},{service:"CHỤP TT",staff:"BÌNH",cost:17e5,paid:!1,edit:5e5,date:"2026-01-18"},{service:"100 ẢNH ALBUM",staff:"",cost:0,paid:!1,edit:0,date:"2026-01-18"}]},{id:"54-T7",jobNo:4,client:"CD Thuý- Planner Diệu Nghi",date:"2026-01-25",phone:"0398271771",venue:"Nhà thờ Nhà Thờ Thạnh An, 2891 QL80, Thị trấn Thanh An, Vĩnh Thạnh, Cần Thơ Nhà cô dâu: 3878 QL80, TT. Thạnh An, H. Vĩnh Thạnh, TP. Cần Thơ Địa điểm tổ chức tiệc nhà gái: Sân Bóng Đá Mini Hoàng Bảo (xéo nhà CD)",package:39e6,deposit:78e5,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"QUAY PS",staff:"THỐNG",cost:3e6,paid:!0,edit:5e5,date:"2026-01-25"},{service:"QUAY PS",staff:"CAN",cost:3e6,paid:!1,edit:5e5,date:"2026-01-25"},{service:"CHỤP PS",staff:"XUÂN",cost:25e5,paid:!0,edit:5e5,date:"2026-01-25"},{service:"CHỤP PS",staff:"TUYỀN",cost:25e5,paid:!0,edit:5e5,date:"2026-01-25"},{service:"CHỤP TT",staff:"BÌNH",cost:27e5,paid:!1,edit:5e5,date:"2026-01-25"},{service:"QUAY PS",staff:"XUÂN",cost:25e5,paid:!0,edit:5e5,date:"2026-02-01"},{service:"CHỤP PS",staff:"BÌNH",cost:2e6,paid:!1,edit:5e5,date:"2026-02-01"}],eventDays:[{date:"2026-01-25",timeline:{le:"",tiec:"",type:"both"}},{date:"2026-02-01",timeline:{le:"",tiec:"",type:"both"}}]},{id:"T12",jobNo:5,client:`Tuyết Vân
tiệc 20 bàn`,date:"2026-01-29",phone:"0931851332",venue:"Địa điểm tổ chức : tư gia ( 1239 đường Vĩnh Lộc , xã Vĩnh lộc b , bình chánh , tphcm)",package:75e5,deposit:15e5,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"CHỤP PS",staff:"XUÂN",cost:25e5,paid:!1,edit:5e5,date:"2026-01-29"},{service:"CHỤP TT",staff:"BÌNH",cost:17e5,paid:!1,edit:5e5,date:"2026-01-29"},{service:"148.900.000,00₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-01-29"},{service:"80.600.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-01-29"},{service:"16.500.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-01-29"},{service:"11.500.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-01-29"},{service:"10.000.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-01-29"},{service:"0₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-01-29"},{service:"10.000.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-01-29"},{service:"20.300.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-01-29"}]},{id:"87 - T11",jobNo:6,client:"Mai Nguyen",date:"2026-02-06",phone:"0799413463",venue:"Địa chỉ nhà cô dâu: 134 Trần Văn Dư, phường 13, quận Tân Bình, TPHCM Thời gian makeup: 5h sáng Thời gian làm lễ: 8h sáng",package:4e6,deposit:8e5,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"CHỤP PS",staff:"XUÂN",cost:25e5,paid:!1,edit:5e5,date:"2026-02-06"}]},{id:"85 - T11",jobNo:7,client:"Minh Tri",date:"2026-02-07",phone:"0854529154",venue:"Địa chỉ nhà trai: 139 Lý Chính Thắng, Phường Xuân Hoà, Quận 3 Địa chỉ nhà thờ họ: 49/10 Hoàng Dư Khương, Quận 10 Địa chỉ nhà gái: A2-10-07 Chung cư 4S Linh Đông, đường 30, KP7, Phường Hiệp Bình, Thủ Đức",package:17e6,deposit:34e5,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"QUAY PS",staff:"THỐNG",cost:3e6,paid:!1,edit:15e5,date:"2026-02-07"},{service:"QUAY PS",staff:"BÌNH",cost:3e6,paid:!1,edit:15e5,date:"2026-02-07"},{service:"CHỤP PS",staff:"XUÂN",cost:25e5,paid:!1,edit:5e5,date:"2026-02-07"},{service:"CHỤP TT",staff:"NGỌC TUYỀN",cost:17e5,paid:!1,edit:3e5,date:"2026-02-07"}]},{id:"86 - T11",jobNo:8,client:"Phương Chi",date:"2026-02-08",phone:"0906360343",venue:"• Nhà cô dâu: 52/3 TX38 Thạnh Xuân, Quận 12, TP HCM",package:85e5,deposit:17e5,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"QUAY PS",staff:"THỐNG",cost:3e6,paid:!1,edit:15e5,date:"2026-02-08"},{service:"CHỤP PS",staff:"XUÂN",cost:25e5,paid:!1,edit:5e5,date:"2026-02-08"}]},{id:"T1",jobNo:9,client:"Phạm Thị Thanh Thuỷ",date:"2026-02-12",phone:"0902855278",venue:"- 28 Đường số 8, KP4, phường Hiệp Bình Phước, Thủ Đức",package:9e6,deposit:18e5,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"CHỤP PS",staff:"XUÂN",cost:25e5,paid:!1,edit:5e5,date:"2026-02-12"},{service:"38.500.000,00₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-02-12"},{service:"16.500.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-02-12"},{service:"11.500.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-02-12"},{service:"20.000.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-02-12"},{service:"0₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-02-12"},{service:"10.000.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-02-12"},{service:"10.300.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-02-12"}]},{id:"T2",jobNo:10,client:`Bích An
Haruwedding`,date:"2026-03-01",phone:"0906347428",venue:"nhà hàng hương cau 2, 86 Tân Canh 17h có mặt",package:3e6,deposit:6e5,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"CHỤP PS",staff:"XUÂN",cost:25e5,paid:!1,edit:5e5,date:"2026-03-01"}]},{id:"005- T1",jobNo:11,client:"Hoàng Nhật Sinh",date:"2026-03-08",phone:"0909109960",venue:"Địa chỉ nhà CR: 232/22/12 Hiệp Thành 13, P. Tân Thới Hiệp (Hiệp Thành, Q12 cũ), TPHCM Địa chỉ nhà CD: Xã Phước An (Long Thọ cũ), Huyện Nhơn Trạch, Tỉnh Đồng Nai - (https://maps.app.goo.gl/wVqAuZjDDDX2ZXkn8) Địa chỉ nhà hàng: Capella ParkView, 03 Đặng Văn Sâm, Phường 9, Quận Phú Nhuận, TPHCM",package:17e6,deposit:34e5,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"QUAY PS",staff:"THỐNG",cost:3e6,paid:!1,edit:15e5,date:"2026-03-08"},{service:"CHỤP PS",staff:"XUÂN",cost:25e5,paid:!1,edit:5e5,date:"2026-03-08"},{service:"CHỤP TT",staff:"BÌNH",cost:17e5,paid:!1,edit:3e5,date:"2026-03-08"}]},{id:"006 - T1",jobNo:14,client:"Vân Hồ",date:"2026-03-10",phone:"0349347261",venue:"Địa chỉ nhà CD: 25/63/1 đường số 6, khu phố 26, phường Hiệp Bình, TPHCM (QThủ Đức cũ)",package:225e5,deposit:45e5,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"QUAY PS",staff:"XUÂN",cost:3e6,paid:!1,edit:15e5,date:"2026-03-10"},{service:"CHỤP PS",staff:"HÙNG",cost:25e5,paid:!1,edit:5e5,date:"2026-03-10"},{service:"CHỤP TT",staff:"BÌNH",cost:17e5,paid:!1,edit:3e5,date:"2026-03-10"},{service:"QUAY PS",staff:"TIẾN",cost:3e6,paid:!1,edit:15e5,date:"2026-03-15"},{service:"CHỤP PS",staff:"XUÂN",cost:25e5,paid:!1,edit:5e5,date:"2026-03-15"},{service:"CHỤP TT",staff:"BÌNH",cost:17e5,paid:!1,edit:3e5,date:"2026-03-15"}],eventDays:[{date:"2026-03-10",timeline:{le:"",tiec:"",type:"both"}},{date:"2026-03-15",timeline:{le:"",tiec:"",type:"both"}}]},{id:"AUTO12",jobNo:12,client:"Vy Phạm",date:"2026-03-14",phone:"0983082810",venue:"Công viên Sala Quận 2 Metro Bến Thành Q1",package:0,deposit:0,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"QUAY PRE",staff:"THỐNG",cost:0,paid:!1,edit:0,date:"2026-03-14"}]},{id:"82- T10",jobNo:13,client:"Duyên",date:"2026-03-14",phone:"",venue:"• Nhà cô dâu: 80 Lãnh Binh Thăng, Phường 13, Quận 11, TP HCM • Nhà chú rể: 785/21 Nguyễn Kiệm, Phường 3, Quận Gò Vấp, TP HCM • Nhà hàng: Khách sạn La Vela, 280 Nam Kỳ Khởi Nghĩa, Phường Xuân Hòa, Quận 3, TP HCM",package:24e6,deposit:48e5,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"QUAY PS",staff:"XUÂN",cost:3e6,paid:!1,edit:8e5,date:"2026-03-14"},{service:"QUAY TT",staff:"HIẾU",cost:2e6,paid:!1,edit:7e5,date:"2026-03-14"},{service:"CHỤP PS",staff:"CAN",cost:25e5,paid:!1,edit:5e5,date:"2026-03-14"},{service:"CHỤP PS",staff:"NGỌC TUYỀN",cost:25e5,paid:!1,edit:5e5,date:"2026-03-14"},{service:"CHỤP TT",staff:"BÌNH",cost:17e5,paid:!1,edit:3e5,date:"2026-03-14"}]},{id:"91- T12",jobNo:15,client:`Trần Thư
lễ gia tiên 2 nhà`,date:"2026-03-22",phone:"0379900566",venue:"Địa chỉ nhà cô dâu: 124/31 Phan Huy Ích, phường Tân Sơn, HCM Địa chỉ nhà chú rể: 272 ấp Bình Minh, xã Suối Cát, H Xuân Lộc, tỉnh Đồng Nai",package:146e5,deposit:292e4,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"QUAY PS",staff:"XUÂN",cost:3e6,paid:!1,edit:15e5,date:"2026-03-22"},{service:"CHỤP PS",staff:"HIẾU",cost:25e5,paid:!1,edit:5e5,date:"2026-03-22"},{service:"CHỤP TT",staff:"BÌNH",cost:17e5,paid:!1,edit:3e5,date:"2026-03-22"}]},{id:"001 - T1",jobNo:16,client:"Ngọc Châu",date:"2026-03-29",phone:"0797718270",venue:"Địa chỉ nhà cô dâu và chú rể: - Chú rể: 17/3/2 đường 10 khu phố 45, phường Linh Xuân, HCM - Cô dâu: chưa chốt ksan Địa chỉ nhà hàng: 38 Đặng Văn Bi, phường Thủ Đức",package:15e6,deposit:3e6,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"QUAY PS",staff:"XUÂN",cost:3e6,paid:!1,edit:15e5,date:"2026-03-29"},{service:"CHỤP PS",staff:"NGỌC TUYỀN",cost:25e5,paid:!1,edit:5e5,date:"2026-03-29"},{service:"CHỤP TT",staff:"BÌNH",cost:17e5,paid:!1,edit:3e5,date:"2026-03-29"},{service:"148.900.000,00₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-03-29"},{service:"80.600.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-03-29"},{service:"16.500.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-03-29"},{service:"11.500.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-03-29"},{service:"20.000.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-03-29"},{service:"0₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-03-29"},{service:"10.000.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-03-29"},{service:"10.300.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-03-29"}]},{id:"009- T2",jobNo:17,client:"Hoàng Nam",date:"2026-04-26",phone:"0762722931",venue:"49 tổ 2, ấp 3, Vĩnh Cửu, Đồng Nai, Việt Nam",package:185e5,deposit:5e6,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"QUAY PS",staff:"THỐNG",cost:500,paid:!1,edit:15e5,date:"2026-04-26"},{service:"CHỤP PS",staff:"XUÂN",cost:25e5,paid:!1,edit:5e5,date:"2026-04-26"},{service:"CHỤP TT",staff:"BÌNH",cost:17e5,paid:!1,edit:3e5,date:"2026-04-26"},{service:"148.900.000,00₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-04-26"},{service:"80.600.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-04-26"},{service:"16.500.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-04-26"},{service:"11.500.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-04-26"},{service:"20.000.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-04-26"},{service:"0₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-04-26"},{service:"10.000.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-04-26"},{service:"10.300.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-04-26"}]},{id:"73 - T9",jobNo:18,client:"Thu Minh",date:"2026-05-16",phone:"0335276418",venue:"162/88 Nguyễn Văn Lượng phường 17 quận Gò Vấp NHÀ HÀNG HƯƠNG PHỐ, A12 Phan Văn Trị phường Hạnh Thông",package:2e7,deposit:4e6,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"QUAY PS",staff:"THỐNG",cost:3e6,paid:!1,edit:8e5,date:"2026-05-16"},{service:"QUAY PS",staff:"BÌNH",cost:3e6,paid:!1,edit:8e5,date:"2026-05-16"},{service:"CHỤP PS",staff:"XUÂN",cost:25e5,paid:!1,edit:5e5,date:"2026-05-16"},{service:"CHỤP TT",staff:"NGỌC TUYỀN",cost:17e5,paid:!1,edit:3e5,date:"2026-05-16"},{service:"ALBUM",staff:"",cost:0,paid:!1,edit:0,date:"2026-05-16"}]},{id:"003- T1",jobNo:19,client:"Vy Pham",date:"2026-05-16",phone:"0983082810",venue:"Nhà CD: 4-13 Lô G, Chung cư Đồng Diều, Phường Chánh Hưng Nhà CR: E1 Cư xá Phú Lâm A, Phường Phú Lâm Nhà hàng white palace Võ Văn Kiệt",package:25e6,deposit:5e6,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"QUAY PS",staff:"Nho",cost:3e6,paid:!1,edit:15e5,date:"2026-05-16"},{service:"QUAY TT",staff:"TRỐNG",cost:2e6,paid:!1,edit:1e6,date:"2026-05-16"},{service:"CHỤP PS",staff:"BẢO",cost:25e5,paid:!1,edit:5e5,date:"2026-05-16"},{service:"CHỤP TT",staff:"TRỐNG",cost:17e5,paid:!1,edit:3e5,date:"2026-05-16"},{service:"ALBUM",staff:"",cost:0,paid:!1,edit:0,date:"2026-05-16"},{service:"148.900.000,00₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-05-16"},{service:"80.600.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-05-16"},{service:"16.500.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-05-16"},{service:"11.500.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-05-16"},{service:"20.000.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-05-16"},{service:"0₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-05-16"},{service:"10.000.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-05-16"},{service:"10.300.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-05-16"}]},{id:"010- T2",jobNo:20,client:"Diệu Nghi Planner",date:"2026-06-06",phone:"0818797768",venue:"Maison de charm - 793/57/16 Trần Xuân Soạn, Phường Tân Hưng, Quận 7, Thành phố Hồ Chí Minh",package:21e6,deposit:42e5,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"QUAY PS",staff:"",cost:3e6,paid:!1,edit:15e5,date:"2026-06-06"},{service:"QUAY PS",staff:"",cost:3e6,paid:!1,edit:15e5,date:"2026-06-06"},{service:"CHỤP PS",staff:"",cost:25e5,paid:!1,edit:5e5,date:"2026-06-06"},{service:"CHỤP TT",staff:"",cost:17e5,paid:!1,edit:3e5,date:"2026-06-06"}]},{id:"008- T2",jobNo:21,client:"Mỹ Thanh",date:"2026-06-20",phone:"0562535455",venue:"Nhà CD & CR: 149/9 Lý Thánh tông, Phường Phú Thạnh Nhà hàng diamond Âu Cơ",package:14e6,deposit:28e5,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"QUAY TT",staff:"",cost:2e6,paid:!1,edit:1e6,date:"2026-06-20"},{service:"CHỤP PS",staff:"",cost:25e5,paid:!1,edit:5e5,date:"2026-06-20"},{service:"CHỤP TT",staff:"",cost:17e5,paid:!1,edit:3e5,date:"2026-06-20"},{service:"148.900.000,00₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-06-20"},{service:"80.600.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-06-20"},{service:"16.500.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-06-20"},{service:"11.500.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-06-20"},{service:"20.000.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-06-20"},{service:"0₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-06-20"},{service:"10.000.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-06-20"},{service:"10.300.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-06-20"}]},{id:"012- T2",jobNo:22,client:"Kim Ngân",date:"2026-07-18",phone:"0944734639",venue:"",package:225e5,deposit:45e5,status:"Mới",eventType:"",isTrash:!1,visibility:!0,timeline:{le:"",tiec:"",type:"both"},deliverables:[],services:[{service:"CHỤP TT",staff:"",cost:17e5,paid:!1,edit:3e5,date:"2026-07-18"},{service:"QUAY PS",staff:"",cost:3e6,paid:!1,edit:15e5,date:"2026-07-19"},{service:"QUAY TT",staff:"",cost:2e6,paid:!1,edit:1e6,date:"2026-07-19"},{service:"CHỤP PS",staff:"",cost:25e5,paid:!1,edit:5e5,date:"2026-07-19"},{service:"CHỤP TT",staff:"",cost:17e5,paid:!1,edit:3e5,date:"2026-07-19"},{service:"148.900.000,00₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-07-19"},{service:"80.600.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-07-19"},{service:"16.500.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-07-19"},{service:"11.500.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-07-19"},{service:"20.000.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-07-19"},{service:"0₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-07-19"},{service:"10.000.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-07-19"},{service:"10.300.000₫",staff:"",cost:0,paid:!1,edit:0,date:"2026-07-19"}],eventDays:[{date:"2026-07-18",timeline:{le:"",tiec:"",type:"both"}},{date:"2026-07-19",timeline:{le:"",tiec:"",type:"both"}}]}],staff:[{id:1,name:"XUÂN",role:"Photo Lead",phone:"0901234567",bank:{no:"001100...",name:"LE MINH XUAN",bank:"VCB"}},{id:2,name:"THỐNG",role:"Cinema Lead",phone:"0902345678",bank:{no:"123456...",name:"VAN THONG",bank:"ACB"}},{id:3,name:"BÌNH",role:"Photographer / Asst",phone:"0903456789",bank:{no:"9021...",name:"QUOC BINH",bank:"TIMO"}},{id:4,name:"HIẾU",role:"Cinema",phone:"0904567890",bank:{no:"Sacombank...",name:"TRONG HIEU",bank:"SCB"}},{id:5,name:"CAN",role:"Cinema",phone:"0905671234",bank:{no:"Techcombank...",name:"HOANG CAN",bank:"TCB"}},{id:6,name:"NGỌC TUYỀN",role:"Photographer",phone:"",bank:{no:"",name:"",bank:""}},{id:7,name:"NHO",role:"Cinema",phone:"",bank:{no:"",name:"",bank:""}},{id:8,name:"BẢO",role:"Photographer",phone:"",bank:{no:"",name:"",bank:""}}],settings:{rates:{"QUAY PS":3e6,"CHỤP PS":25e5,"CHỤP TT":17e5,"QUAY TT":2e6}},gears:[{id:"g1",name:"Sony A7M4",type:"Camera",serial:"SN-001",status:"Sẵn sàng",notes:""},{id:"g2",name:"Sony A7S3",type:"Camera",serial:"SN-002",status:"Sẵn sàng",notes:""},{id:"g3",name:"Sony A7M3",type:"Camera",serial:"SN-003",status:"Sẵn sàng",notes:""},{id:"g4",name:"Lens 24-70mm GM II",type:"Lens",serial:"LN-001",status:"Sẵn sàng",notes:""},{id:"g5",name:"Lens 70-200mm GM",type:"Lens",serial:"LN-002",status:"Sẵn sàng",notes:""},{id:"g6",name:"Lens 35mm f1.4",type:"Lens",serial:"LN-003",status:"Đang bảo trì",notes:"Chỉ lau bụi"},{id:"g7",name:"DJI Mavic 3 Pro",type:"Flycam",serial:"FC-001",status:"Sẵn sàng",notes:""},{id:"g8",name:"Ronin RS3 Pro",type:"Gimbal",serial:"GB-001",status:"Sẵn sàng",notes:""},{id:"g9",name:"GODOX V1",type:"Flash",serial:"FL-001",status:"Sẵn sàng",notes:""}],gearBookings:[],leads:[{id:"lead_1",clientName:"Nguyễn Thị A",phone:"0901234567",date:"2026-03-01",source:"Facebook",status:"Mới Hỏi",notes:"Hỏi giá chụp phóng sự cưới tháng 5.",updated:"2026-03-01T08:00:00Z"},{id:"lead_2",clientName:"Trần Văn B",phone:"0987654321",date:"2026-02-28",source:"Zalo",status:"Đang Tư Vấn",notes:"Đã báo giá gói 15tr, chờ khách check lại ngân sách.",updated:"2026-02-28T14:30:00Z"},{id:"lead_3",clientName:"Lê C",phone:"0909090909",date:"2026-02-25",source:"Website",status:"Hẹn Thử Váy",notes:"Hẹn tới studio thử thêm váy ngày 3/3 lúc 15h.",updated:"2026-02-27T10:00:00Z"}]};function go(t){if(!t)return{photo:"-",video:"-"};const e=new Date(t),n=new Date(e);n.setDate(n.getDate()+7);const i=new Date(e);return i.setDate(i.getDate()+20),{photo:n.toLocaleDateString("vi-VN"),video:i.toLocaleDateString("vi-VN"),photoRaw:n,videoRaw:i}}function D(t){return new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",maximumFractionDigits:0}).format(t||0).replace("₫","đ")}function Va(){return Math.random().toString(36).substr(2,4).toUpperCase()+"-"+Date.now().toString(36).substr(-4).toUpperCase()}function cn(t){return Array.isArray(t)?t.join(", "):t||""}function ft(t){const e=String(t?.service||"").trim();return!(!e||/^\d[\d\.,\s]*đ?$/i.test(e)||/^(tổng giá trị hợp đồng|chênh lệch|giá trị gói|số tiền cọc|ghi chú|chi phí phát sinh)$/i.test(e))}function vo(t,e){const n=document.createElement("aside");n.className="sidebar";const i=window.state?.notificationLog||[],r=i.filter(o=>!o.read).length;return n.innerHTML=`
    <div class="sidebar-brand" style="display:flex;align-items:center;gap:0.55rem;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:0.55rem">
        <img src="/haru-job-logo.png" alt="Haru Job" style="width:24px;height:24px;object-fit:contain;border-radius:6px" />
        <span>HARU JOB</span>
      </div>
      <!-- Phase 3 #8: Notification Bell -->
      <div style="position:relative;cursor:pointer" onclick="window.toggleNotifPanel()" title="Thông báo">
        <span style="font-size:1.1rem">&#128276;</span>
        <span id="notif-bell-badge" style="position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;font-size:0.55rem;font-weight:900;min-width:16px;height:16px;border-radius:50%;display:${r>0?"flex":"none"};align-items:center;justify-content:center;border:2px solid var(--bg-sidebar)">${r>9?"9+":r}</span>
      </div>
    </div>

    <!-- Phase 3 #8: Notification Dropdown Panel -->
    <div id="notif-dropdown-panel" style="display:none;position:absolute;top:60px;left:0;right:0;z-index:9999;background:var(--bg-card);border:1px solid var(--border);border-radius:10px;margin:0 0.5rem;box-shadow:0 8px 24px rgba(0,0,0,0.12);max-height:340px;overflow-y:auto">
      <div style="padding:0.6rem 0.9rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:0.8rem;font-weight:800">&#128276; Lịch sử hoạt động</span>
        <button onclick="event.stopPropagation();window.clearNotifLog()" style="background:none;border:none;font-size:0.68rem;color:var(--text-dim);cursor:pointer;font-weight:700">Xóa tất cả</button>
      </div>
      ${i.length===0?'<div style="padding:1rem;text-align:center;font-size:0.8rem;color:var(--text-dim)">Chưa có hoạt động nào</div>':i.slice(0,20).map(o=>`
        <div style="padding:0.5rem 0.9rem;border-bottom:1px solid var(--border);${o.read?"":"background:rgba(59,130,246,0.05)"}">
          <div style="font-size:0.75rem;font-weight:700;color:var(--text-main)">${o.action}</div>
          <div style="font-size:0.62rem;color:var(--text-dim);margin-top:0.15rem">${new Date(o.time).toLocaleTimeString("vi-VN")} • ${o.user}</div>
        </div>`).join("")}
    </div>

    <nav class="sidebar-nav">
      <div class="nav-item" onclick="window.openGlobalSearch()" style="background: rgba(22,163,74,0.1); border: 1px dashed rgba(22,163,74,0.3); margin-bottom: 0.5rem; justify-content: space-between">
        <span><span class="icon">&#128270;</span> Tìm kiếm</span>
        <span style="font-size: 0.65rem; padding: 0.15rem 0.3rem; background: rgba(0,0,0,0.05); border-radius: 4px; color: var(--text-dim)">Cmd+K</span>
      </div>

      ${window.state?.currentUser?.role==="admin"||!window.state?.currentUser?`
      <div class="nav-item ${t==="portfolio"?"active":""}" onclick="window.navigate('portfolio')" style="background: rgba(249,115,22,0.1); border: 1px solid rgba(249,115,22,0.25); margin-bottom: 0.75rem; font-weight: 800;">
        <span class="icon">🖼️</span> Album
        <span style="font-size:0.6rem;background:rgba(249,115,22,0.15);color:#f97316;padding:0.15rem 0.4rem;border-radius:6px;font-weight:900;margin-left:auto">HUB</span>
      </div>`:""}

      <div style="font-size: 0.82rem; font-weight: 800; color: var(--text-dim); margin: 1rem 0 0.5rem 0.75rem; text-transform: uppercase;">&#272;iều hành</div>
      ${window.state?.currentUser?.role!=="admin"?`
      <div class="nav-item ${t==="workspace"?"active":""}" onclick="window.navigate('workspace')" style="background: rgba(168,85,247,0.1); border-left: 3px solid #a855f7; margin-bottom: 0.5rem; justify-content: space-between;">
        <span><span class="icon">🚀</span> Không gian làm việc</span>
      </div>
      `:""}

      <div class="nav-item ${t==="dashboard"?"active":""}" onclick="window.navigate('dashboard')">
        <span class="icon">&#128202;</span> Dự án
      </div>
      <div class="nav-item ${t==="edit"?"active":""}" onclick="window.navigate('edit')">
        <span class="icon">&#127916;</span> Deadline EDIT
      </div>
      <div class="nav-item ${t==="edit_video"?"active":""}" onclick="window.navigate('edit_video')">
        <span class="icon">&#127902;&#65039;</span> Edit Video
      </div>
      <div class="nav-item ${t==="edit_photo"?"active":""}" onclick="window.navigate('edit_photo')">
        <span class="icon">&#128247;</span> Edit Photo
      </div>
      <div class="nav-item ${t==="kanban"?"active":""}" onclick="window.navigate('kanban')">
        <span class="icon">&#128203;</span> Kanban
      </div>
      <div class="nav-item ${t==="calendar"?"active":""}" onclick="window.navigate('calendar')">
        <span class="icon">&#128197;</span> Lịch / Nhắc việc
      </div>

      ${window.state?.currentUser?.role==="admin"||!window.state?.currentUser?`
      <div style="font-size: 0.82rem; font-weight: 800; color: var(--text-dim); margin: 1.5rem 0 0.5rem 0.75rem; text-transform: uppercase;">Quản lý</div>
      <div class="nav-item ${t==="jobs"?"active":""}" onclick="window.navigate('jobs')">
        <span class="icon">&#128193;</span> Lưu trữ dự án
      </div>
      <div class="nav-item ${t==="clients"?"active":""}" onclick="window.navigate('clients')">
        <span class="icon">&#129309;</span> Khách hàng
      </div>
      <div class="nav-item ${t==="finance"||t==="tax"?"active":""}" onclick="window.navigate('finance')">
        <span class="icon">&#128176;</span> Tài chính
      </div>
      <div class="nav-item ${t==="staff"?"active":""}" onclick="window.navigate('staff')">
        <span class="icon">&#127917;</span> Nhân sự
      </div>
      <div class="nav-item ${t==="gear"?"active":""}" onclick="window.navigate('gear')">
        <span class="icon">📷</span> Kho thiết bị
      </div>

      <div class="nav-item ${t==="analytics"?"active":""}" onclick="window.navigate('analytics')">
        <span class="icon">&#128202;</span> Analytics
      </div>



      <div onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'block':'none';this.querySelector('.collapse-icon').textContent=this.nextElementSibling.style.display==='none'?'▸':'▾'" style="font-size: 0.82rem; font-weight: 800; color: var(--text-dim); margin: 1.5rem 0 0.5rem 0.75rem; text-transform: uppercase; cursor: pointer; display:flex; align-items:center; gap:0.3rem; user-select:none"><span class="collapse-icon">${["sync","nas","history","trash","settings"].includes(t)?"▾":"▸"}</span>Hệ thống</div>
      <div style="display:${["sync","nas","history","trash","settings"].includes(t)?"block":"none"}">
      <div class="nav-item ${t==="sync"?"active":""}" onclick="window.navigate('sync')">
        <span class="icon">&#128260;</span> Sync dữ liệu
      </div>
      <div class="nav-item ${t==="nas"?"active":""}" onclick="window.navigate('nas')">
        <span class="icon">&#9729;&#65039;</span> NAS / Drive
      </div>
      <div class="nav-item ${t==="history"?"active":""}" onclick="window.navigate('history')">
        <span class="icon">&#128220;</span> Lịch sử
      </div>
      <div class="nav-item ${t==="trash"?"active":""}" onclick="window.navigate('trash')">
        <span class="icon">&#128465;&#65039;</span> Thùng rác
      </div>
      <div class="nav-item ${t==="settings"?"active":""}" onclick="window.navigate('settings')">
        <span class="icon">👑</span> Admin Center
      </div>
      </div>`:""}


      <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border)">
        <div style="font-size: 0.75rem; font-weight: 800; color: var(--text-dim); margin: 0 0 0.5rem 0.75rem; text-transform: uppercase;">🟢 Đang Online</div>
        <div style="display: flex; flex-direction: column; gap: 0.2rem; margin: 0 0.75rem 1rem 0.75rem">
          ${window.state?.presence&&Object.entries(window.state.presence).filter(([o,s])=>s.online).length>0?Object.entries(window.state.presence).filter(([o,s])=>s.online).map(([o,s])=>`
            <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; font-weight: 600; color: var(--text-main)">
              <div style="width: 8px; height: 8px; border-radius: 50%; background: #16a34a"></div>
              <span>${o}</span>
            </div>
          `).join(""):'<div style="font-size: 0.7rem; color: var(--text-dim); font-style: italic">Chỉ mình bạn</div>'}
        </div>


        <div class="nav-item" onclick="window.logout()" style="color: #ef4444">
          <span class="icon">&#128682;</span> Đăng xuất
        </div>
      </div>
    </nav>
  `,setTimeout(()=>{document.addEventListener("click",function o(s){const a=document.getElementById("notif-dropdown-panel");a&&a.style.display!=="none"&&!n.contains(s.target)&&(a.style.display="none",document.removeEventListener("click",o))})},100),n}function yo(t,e){const n=document.createElement("nav");n.className="bottom-nav";const i=[{id:"dashboard",icon:"📊",label:"Dự án"},{id:"edit_photo",icon:"📷",label:"Edit Photo"},{id:"edit_video",icon:"🎞️",label:"Edit"},{id:"calendar",icon:"📅",label:"Lịch"},{id:"kanban",icon:"📋",label:"Kanban"},{id:"staff",icon:"🎬",label:"Nhân sự"}];return n.innerHTML=i.map(r=>`
    <div class="bottom-nav-item ${t===r.id?"active":""}" onclick="window.navigate('${r.id}')">
      <span class="icon">${r.icon}</span>
      <span>${r.label}</span>
    </div>
  `).join(""),n}function bo(t,e){const n=document.createElement("div");n.className="month-picker";const i=["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"],r=t.extraMonth,o=r?`T${t.currentMonth} + T${r.month}`:"";return n.innerHTML=`
    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 0.5rem">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
         <button class="picker-btn" id="prev-year">←</button>
         <div class="year-label" style="font-size: 1.1rem; padding: 0.2rem; font-weight: 900">${t.currentYear}</div>
         <button class="picker-btn" id="next-year">→</button>
      </div>
      <select id="month-select" class="form-control" style="font-size: 0.95rem; font-weight: 700; padding: 0.4rem 1rem; background: var(--surface); color: var(--text-main); border: 1.5px solid var(--primary); border-radius: 8px; flex-grow: 1; max-width: 150px; cursor: pointer; outline: none; appearance: auto">
        ${i.map((s,a)=>`
          <option value="${a+1}" ${t.currentMonth===a+1?"selected":""}>Tháng ${a+1}</option>
        `).join("")}
      </select>
      <button id="multi-month-btn" style="font-size:0.72rem;padding:0.3rem 0.6rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;border:1.5px solid ${r?"var(--primary)":"var(--border)"};background:${r?"var(--primary)":"var(--surface)"};color:${r?"#fff":"var(--text-dim)"}" title="Gộp thêm 1 tháng kế tiếp">${r?o:"+1T"}</button>
    </div>
  `,n.querySelector("#month-select").onchange=s=>{t.extraMonth=null,e(parseInt(s.target.value),t.currentYear)},n.querySelector("#prev-year").onclick=()=>{t.extraMonth=null,e(t.currentMonth,t.currentYear-1)},n.querySelector("#next-year").onclick=()=>{t.extraMonth=null,e(t.currentMonth,t.currentYear+1)},n.querySelector("#multi-month-btn").onclick=()=>{if(t.extraMonth)t.extraMonth=null;else{let s=t.currentMonth+1,a=t.currentYear;s>12&&(s=1,a++),t.extraMonth={month:s,year:a}}window.updateUI&&window.updateUI()},n}function wo(t){const e=document.createElement("div");e.className="view-container reveal";const n=t.currentUser||{},i=n.staffName||n.username||"Nhân sự",r=n.role==="editor"?"Editor":"Staff",o=c=>c?c.toLowerCase().includes(i.toLowerCase()):!1,s=new Date;s.setHours(0,0,0,0);const a=t.jobs.filter(c=>{if(c.isTrash)return!1;let f=!1;if(c.services&&c.services.some(u=>o(u.staff))&&(f=!0),c.eventDays&&c.eventDays.forEach(u=>{u.services&&u.services.some(h=>o(h.staff))&&(f=!0)}),f){const u=new Date(c.date);if(u.setHours(0,0,0,0),u>=s)return!0}return!1}).sort((c,f)=>new Date(c.date)-new Date(f.date)),l=[];t.jobs.forEach(c=>{c.isTrash||(c.deliverables||[]).forEach((f,u)=>{o(f.editor)&&l.push({job:c,del:f,dIdx:u})})}),l.sort((c,f)=>{const u=new Date(c.job.date),h=new Date(f.job.date);return u-h});const d=a.length===0?'<div style="padding:1.5rem;text-align:center;color:var(--text-dim);background:var(--bg-sidebar);border-radius:12px;font-size:0.85rem">Không có lịch đi quay/chụp nào sắp tới.</div>':`<div style="display:grid;gap:0.75rem">
        ${a.map(c=>{const u=new Date(c.date).toLocaleDateString("vi-VN",{weekday:"short",day:"2-digit",month:"2-digit"});return`
          <div class="glass-panel" style="padding:1rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer" onclick="window.openModal('job_detail', '${c.id}')">
            <div>
              <div style="font-weight:800;color:var(--text-main);font-size:1rem;margin-bottom:0.25rem">${c.client}</div>
              <div style="font-size:0.75rem;color:var(--text-dim)">📍 ${c.venue||"Chưa rõ địa điểm"}</div>
            </div>
            <div style="text-align:right">
              <div style="font-size:0.85rem;font-weight:900;color:var(--primary);background:rgba(22,163,74,0.1);padding:0.25rem 0.6rem;border-radius:8px">${u}</div>
            </div>
          </div>
          `}).join("")}
       </div>`,p=l.length===0?'<div style="padding:1.5rem;text-align:center;color:var(--text-dim);background:var(--bg-sidebar);border-radius:12px;font-size:0.85rem">Không có task hậu kỳ nào cần xử lý.</div>':`<div style="display:grid;gap:0.75rem;grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">
        ${l.map(c=>{const f={"Chưa bắt đầu":"#94a3b8","Đang cắt":"#3b82f6","Demo 1":"#f59e0b","Chỉnh sửa":"#8b5cf6","Hoàn thành":"#22c55e"};return`
          <div class="glass-panel" style="padding:1rem;border-left:4px solid ${f[c.del.editStatus||"Chưa bắt đầu"]||"#94a3b8"}">
            <div style="font-size:0.75rem;color:var(--text-dim);margin-bottom:0.3rem">K/H: <span style="font-weight:700;color:var(--text-main)">${c.job.client}</span></div>
            <div style="font-weight:800;font-size:0.95rem;margin-bottom:0.75rem">${c.del.name} <span style="font-weight:500;font-size:0.7rem;color:var(--text-dim)">(${c.del.quantity||1})</span></div>
            
            <div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.75rem">
              <select class="input-modern" style="padding:0.3rem 0.6rem;font-size:0.75rem;flex:1;background:var(--bg-sidebar)" onchange="window.updateEditStatus('${c.job.id}', '${c.del.name}', this.value)">
                ${Object.keys(f).map(h=>`<option value="${h}" ${c.del.editStatus===h?"selected":""}>${h}</option>`).join("")}
              </select>
            </div>
            
            <button class="btn btn-secondary btn-sm" style="width:100%;font-size:0.7rem" onclick="window.openModal('job_detail', '${c.job.id}')">Xem chi tiết Job</button>
          </div>
          `}).join("")}
       </div>`;return e.innerHTML=`
    <div style="padding:1.5rem;border-bottom:1px solid var(--border);margin-bottom:1.5rem">
      <h1 style="font-size:1.6rem;font-weight:900;background:-webkit-linear-gradient(-45deg,#a855f7,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:0.25rem">Xin chào, ${i}!</h1>
      <div style="font-size:0.85rem;color:var(--text-dim)">Đây là không gian làm việc của bạn. Vai trò: <strong>${r}</strong></div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:2rem">
      <div>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:1rem">
          <div style="width:32px;height:32px;border-radius:10px;background:rgba(22,163,74,0.1);color:#16a34a;display:flex;align-items:center;justify-content:center;font-size:1.1rem">🎥</div>
          <h2 style="font-size:1.1rem;font-weight:800;margin:0">Lịch quay/chụp sắp tới</h2>
        </div>
        ${d}
      </div>

      <div>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:1rem">
          <div style="width:32px;height:32px;border-radius:10px;background:rgba(168,85,247,0.1);color:#a855f7;display:flex;align-items:center;justify-content:center;font-size:1.1rem">💻</div>
          <h2 style="font-size:1.1rem;font-weight:800;margin:0">Hậu kỳ đang được giao</h2>
        </div>
        ${p}
      </div>
    </div>
  `,e}function ai(t,e){try{const n=document.createElement("div");n.className="view-container reveal";const i=`${t.currentYear}-${t.currentMonth}`,r=t.financeMetadata[i]||{ads:0,office:0},o=[...new Set(t.jobs.flatMap(y=>y.services.map(x=>x.staff)))].sort(),s=t.searchQuery||t.statusFilter==="QUÁ HẠN";let a=t.jobs.filter(y=>{if(y.isTrash)return!1;if(s)return!0;const x=new Date(y.date);return Number.isNaN(x.getTime())?!1:x.getMonth()+1===t.currentMonth&&x.getFullYear()===t.currentYear});const l=y=>{if(!y?.date||(y.status||"").toLowerCase().includes("hoàn thành"))return!1;const x=new Date(y.date);if(Number.isNaN(x.getTime()))return!1;const T=new Date(x);T.setDate(T.getDate()+30);const $=new Date;return $.setHours(0,0,0,0),T.setHours(0,0,0,0),T<$};if(t.staffFilter&&t.staffFilter!=="TẤT CẢ"&&(a=a.filter(y=>y.services.some(x=>x.staff===t.staffFilter))),t.statusFilter&&t.statusFilter!=="TẤT CẢ"&&(t.statusFilter==="QUÁ HẠN"?a=a.filter(l):a=a.filter(y=>y.status===t.statusFilter)),t.searchQuery){const y=t.searchQuery.toLowerCase();a=a.filter(x=>x.client.toLowerCase().includes(y)||x.id.toLowerCase().includes(y)||(x.venue||"").toLowerCase().includes(y)||(x.notes||"").toLowerCase().includes(y))}const d=a.reduce((y,x)=>y+x.package,0),p=a.reduce((y,x)=>y+(x.services||[]).filter(ft).reduce((T,$)=>T+($.cost||0),0),0),c=a.reduce((y,x)=>y+(x.services||[]).filter(ft).reduce((T,$)=>T+($.edit||0),0),0),f=p+c+(r.ads||0)+(r.office||0),u=d-f,h=[...new Set(t.jobs.map(y=>y.status))].sort(),v=t.jobs.filter(y=>!y.isTrash).filter(l).length,g=Array.from({length:12},(y,x)=>{const T=x+1,$=t.jobs.filter(I=>!I.isTrash&&I.month==T&&I.year==t.currentYear);return{month:T,count:$.length,revenue:$.reduce((I,B)=>I+(B.package||0),0)}}),_=Math.max(...g.map(y=>y.revenue),1),b=`
    <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:1rem 1.25rem;margin-bottom:0.75rem;box-shadow:var(--shadow-sm)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem">
        <div style="display:flex;align-items:center;gap:0.5rem">
          <div style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:0.8rem;color:#fff">📊</div>
          <span style="font-size:0.75rem;font-weight:800;text-transform:uppercase;color:var(--text-dim)">Doanh thu ${t.currentYear}</span>
        </div>
        <span style="font-size:0.65rem;color:var(--text-dim);background:var(--accent-soft);padding:0.15rem 0.5rem;border-radius:10px;font-weight:700">${g.filter(y=>y.count>0).length} tháng có doanh thu</span>
      </div>
      <div style="display:flex;align-items:flex-end;gap:4px;height:52px">
        ${g.map((y,x)=>{const T=y.revenue>0?Math.max(6,Math.round(y.revenue/_*52)):6,I=y.month===t.currentMonth?"linear-gradient(180deg,#16a34a,#22c55e)":y.revenue>0?"linear-gradient(180deg,#3b82f6,#60a5fa)":"var(--border)";return`<div class="year-chart-bar" onclick="window.navigate&&window.navigate('dashboard');window.updateMonth&&window.updateMonth(${y.month},${t.currentYear})" title="T${y.month}: ${y.count} job — ${y.revenue.toLocaleString("vi-VN")}đ"
              style="flex:1;height:${T}px;background:${I};border-radius:4px 4px 1px 1px;cursor:pointer;opacity:${y.revenue>0?1:.3};min-width:0;animation-delay:${x*.04}s;transition:opacity 0.2s,transform 0.2s"
              onmouseover="this.style.opacity=0.75;this.style.transform='scaleY(1.08)'" onmouseout="this.style.opacity=${y.revenue>0?1:.3};this.style.transform='scaleY(1)'"></div>`}).join("")}
      </div>
      <div style="display:flex;gap:4px;margin-top:4px">
        ${g.map(y=>`<div style="flex:1;text-align:center;font-size:0.5rem;color:${y.month===t.currentMonth?"var(--primary)":"var(--text-dim)"};font-weight:${y.month===t.currentMonth?"900":"600"};min-width:0;overflow:hidden">T${y.month}</div>`).join("")}
      </div>
    </div>`;return n.innerHTML=`
    <header class="section-header">
      <div>
        <h1 class="view-title">Danh sách Dự án</h1>
        <p style="color: var(--text-dim); font-size: 0.9rem;">Quản lý tiến độ, tổng kết và tình trạng dự án của bạn</p>
      </div>
      <div style="display: flex; gap: 0.75rem; align-items: center">
         <div onclick="window.openGlobalSearch()" style="background: #fff; border: 1.5px solid var(--border); color: var(--text-dim); padding: 0.4rem 0.75rem; border-radius: 8px; font-size: 0.85rem; width: 220px; cursor: pointer; display: flex; align-items: center; justify-content: space-between">
           <span><i class="fas fa-search" style="margin-right:0.4rem"></i> Tìm kiếm toàn cục...</span>
           <span style="font-size: 0.65rem; background: var(--bg-hover); padding: 0.1rem 0.3rem; border-radius: 4px">Cmd+K</span>
         </div>
         <select onchange="window.setStatusFilter(this.value)"
           style="background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: var(--text-main); background: #fff; padding: 0.4rem 0.5rem; border-radius: 6px; font-size: 0.7rem">
           <option value="TẤT CẢ" ${t.statusFilter==="TẤT CẢ"?"selected":""}>Tất cả trạng thái</option>
           <option value="QUÁ HẠN" ${t.statusFilter==="QUÁ HẠN"?"selected":""}>Quá hạn (${v})</option>
           ${h.map(y=>`<option value="${y}" ${t.statusFilter===y?"selected":""}>${y}</option>`).join("")}
         </select>

         <button class="btn btn-primary" onclick="window.openModal('add_job')">
           <i class="fas fa-plus"></i> Thêm Dự Án
         </button>
      </div>
    </header>

    <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 1rem">
      <button onclick="window.setStaffFilter('TẤT CẢ')" class="btn btn-sm" style="font-size: 0.82rem; padding: 0.2rem 0.6rem; border-radius: 20px; ${t.staffFilter==="TẤT CẢ"?"background: var(--accent); color: #000; border: none":"background: rgba(255,255,255,0.05); color: var(--text-dim); border: 1px solid var(--border)"}">Tất cả</button>
      ${o.map(y=>`
        <button onclick="window.setStaffFilter('${y}')" class="btn btn-sm" style="font-size: 0.82rem; padding: 0.2rem 0.6rem; border-radius: 20px; ${t.staffFilter===y?"background: var(--accent); color: #000; border: none":"background: rgba(255,255,255,0.05); color: var(--text-dim); border: 1px solid var(--border)"}">${y}</button>
      `).join("")}
    </div>

    ${b}

    ${t.staffFilter&&t.staffFilter!=="TẤT CẢ"?(()=>{const y=t.staffFilter,x=a.reduce((I,B)=>I+B.services.filter(P=>P.staff&&cn(P.staff).includes(y)).reduce((P,X)=>P+X.cost,0),0),T=a.reduce((I,B)=>I+B.services.filter(P=>P.staff&&cn(P.staff).includes(y)&&P.paid).reduce((P,X)=>P+X.cost,0),0),$=x-T;return`
        <div class="staff-quick-view reveal" style="margin-top: 1.5rem; padding: 1.25rem 1.5rem; background: rgba(22,163,74,0.05); border: 1px solid rgba(22,163,74,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 4px 15px rgba(0,0,0,0.02)">
           <div style="display: flex; align-items: center; gap: 1rem">
              <div style="width: 48px; height: 48px; background: rgba(22,163,74,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--success); font-weight: 800">
                 ${y.charAt(0)}
              </div>
              <div>
                 <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-main)">${y}</div>
                 <div style="font-size: 0.85rem; color: var(--text-dim)">Tham gia ${a.length} dự án trong tháng ${t.currentMonth}</div>
              </div>
           </div>
           <div style="display: flex; gap: 2.5rem; border-left: 1px solid rgba(22,163,74,0.15); padding-left: 2.5rem">
              <div>
                 <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 800; color: var(--text-dim); margin-bottom: 0.2rem">Tổng thu nhập</div>
                 <div class="payment-metric" style="font-size: 1.15rem; font-weight: 900; color: var(--text-main)">${D(x)}</div>
              </div>
              <div>
                 <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 800; color: var(--text-dim); margin-bottom: 0.2rem">Đã thanh toán</div>
                 <div class="payment-metric" style="font-size: 1.15rem; font-weight: 900; color: var(--success)">${D(T)}</div>
              </div>
              <div>
                 <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 800; color: var(--text-dim); margin-bottom: 0.2rem">Còn nợ</div>
                 <div class="payment-metric" style="font-size: 1.15rem; font-weight: 900; color: var(--danger)">${D($)}</div>
              </div>
           </div>
        </div>
      `})():""}

    <div class="monthly-report glass-panel" style="margin-top: 0.5rem; padding: 0.75rem 1rem; border: 1px solid var(--border-bright); border-radius: 16px">
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap">
        <div style="display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap">
          <div class="stat-card stat-animate" style="min-width:50px">
            <span class="label" style="font-size: 0.5rem">Tổng Dự án</span>
            <div class="value" style="font-size: 0.9rem; font-weight: 800">${a.length}${(()=>{const y=new Date(t.currentYear,t.currentMonth-2,1),x=y.getMonth()+1,T=y.getFullYear(),$=t.jobs.filter(ie=>!ie.isTrash&&ie.month==x&&ie.year==T);if(!$.length)return"";const I=a.length-$.length,B=$.length>0?Math.round(I/$.length*100):0,P=I>0?"#16a34a":I<0?"#ef4444":"#6b7280",X=I>0?"↑":I<0?"↓":"→";return`<span style="font-size:0.55rem;font-weight:900;color:${P};margin-left:4px;background:${P}18;padding:1px 4px;border-radius:4px">${X}${Math.abs(B)}%</span>`})()}</div>
          </div>
          <div style="width:1px;height:28px;background:var(--border)"></div>
          <div style="display: flex; gap: 0.8rem; flex-wrap: wrap">
            <div class="stat-animate" style="min-width: 80px">
              <span style="font-size: 0.5rem; text-transform: uppercase; font-weight: 800; color:var(--text-dim); display:block">Doanh thu</span>
              <div style="font-size: 0.85rem; font-weight: 800">${D(d)}${(()=>{const y=new Date(t.currentYear,t.currentMonth-2,1),x=y.getMonth()+1,T=y.getFullYear(),$=t.jobs.filter(ie=>!ie.isTrash&&ie.month==x&&ie.year==T).reduce((ie,w)=>ie+(w.package||0),0);if(!$)return"";const I=d-$,B=Math.round(I/$*100),P=I>0?"#16a34a":I<0?"#ef4444":"#6b7280",X=I>0?"↑":I<0?"↓":"→";return`<span style="font-size:0.55rem;font-weight:900;color:${P};margin-left:4px;background:${P}18;padding:1px 4px;border-radius:4px">${X}${Math.abs(B)}%</span>`})()}</div>
            </div>
            <div class="stat-animate" style="min-width: 80px">
              <span style="font-size: 0.5rem; text-transform: uppercase; font-weight: 800; color:var(--text-dim); display:block">Nhân sự/Edit</span>
              <div style="font-size: 0.85rem; font-weight: 800">${D(p+c)}</div>
            </div>
            <div class="stat-animate" style="min-width: 80px">
              <span style="font-size: 0.5rem; text-transform: uppercase; font-weight: 800; color:var(--text-dim); display:block">Ads/Office</span>
              <div style="font-size: 0.85rem; font-weight: 800">${D((r.ads||0)+(r.office||0))}</div>
            </div>
            <div class="stat-animate" style="min-width: 80px">
              <span style="font-size: 0.5rem; text-transform: uppercase; font-weight: 800; color:var(--text-dim); display:block">Lợi nhuận ròng</span>
              <div style="font-size: 1rem; font-weight: 900; color: ${u>=0?"var(--success)":"var(--danger)"}">
                ${D(u)}${(()=>{const y=new Date(t.currentYear,t.currentMonth-2,1),x=y.getMonth()+1,T=y.getFullYear(),$=t.jobs.filter(z=>!z.isTrash&&z.month==x&&z.year==T),I=$.reduce((z,E)=>z+(E.package||0),0),B=$.reduce((z,E)=>z+(E.services||[]).filter(ft).reduce((O,Z)=>O+(Z.cost||0)+(Z.edit||0),0),0),P=I-B;if(!I)return"";const X=u-P,ie=P!==0?Math.round(X/Math.abs(P)*100):0,w=X>0?"#16a34a":X<0?"#ef4444":"#6b7280",k=X>0?"↑":X<0?"↓":"→";return`<span style="font-size:0.55rem;font-weight:900;color:${w};margin-left:4px;background:${w}18;padding:1px 4px;border-radius:4px">${k}${Math.abs(ie)}%</span>`})()}
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center; background: rgba(0,0,0,0.03); padding: 0.4rem 0.6rem; border-radius: 8px">
          <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 600">Ads:</span>
          <input type="number" id="ads-input-${i}" value="${r.ads}" style="background: #fff; border: 1px solid var(--border); font-size: 0.78rem; width: 80px; color: var(--text-main); font-weight: 700; border-radius: 6px; padding: 0.25rem 0.4rem">
          <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 600">Off:</span>
          <input type="number" id="off-input-${i}" value="${r.office}" style="background: #fff; border: 1px solid var(--border); font-size: 0.78rem; width: 80px; color: var(--text-main); font-weight: 700; border-radius: 6px; padding: 0.25rem 0.4rem">
          <button class="btn btn-secondary btn-sm" style="font-size: 0.75rem; padding: 0.25rem 0.6rem" onclick="window.saveMonthlyReport('${i}')">💾 Lưu</button>
        </div>
      </div>
    </div>



      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem">
         <button class="btn btn-primary btn-sm" onclick="window.viewPA3Report('${i}')">📊 Xem PA3</button>
      </div>
    </div>

    <div class="job-grid" style="margin-top: 1.5rem">
      ${a.length>0?a.slice().sort((y,x)=>new Date(y.date)-new Date(x.date)).map(y=>Ii(y)).join(""):`
        <div style="grid-column:1/-1;text-align:center;padding:3rem 1.5rem">
          <div class="empty-state-icon" style="font-size:3.5rem;margin-bottom:1rem">📋</div>
          <h3 style="font-size:1.15rem;font-weight:800;color:var(--text-main);margin-bottom:0.4rem">
            Chưa có dự án nào trong Tháng ${t.currentMonth}
          </h3>
          <p style="font-size:0.85rem;color:var(--text-dim);max-width:340px;margin:0 auto 1.25rem">
            Bắt đầu thêm dự án mới để quản lý tiến độ và tài chính hiệu quả.
          </p>
          <button class="btn btn-primary" onclick="window.openModal('add_job')" style="margin:0 auto">
            <i class="fas fa-plus"></i> Thêm Dự Án Mới
          </button>
        </div>
      `}
    </div>
  `,n}catch(n){console.error("Lỗi crash bảng điều khiển (renderDashboard):",n);const i=document.createElement("div");return i.className="view-container reveal",i.innerHTML=`<div style="padding: 2rem; color: var(--danger); text-align: center;"><h1>⚠️ Lỗi Hiển Thị Dashboard</h1><p>Dữ liệu bị lỗi: ${n.message}</p></div>`,i}}function Ii(t){try{if(!t)throw new Error("Job is undefined");const e=go(t.date||""),n=t.status.toLowerCase().replace(/\s+/g,"-"),i=(t.services||[]).filter(ft),r=i.reduce((p,c)=>p+(c.cost||0),0),o=i.reduce((p,c)=>p+(c.edit||0),0),s=t.package-(r+o),a=i.filter(p=>(Array.isArray(p.service)?p.service.join(" "):p.service||"").toLowerCase().includes("chụp")).length,l=i.filter(p=>(Array.isArray(p.service)?p.service.join(" "):p.service||"").toLowerCase().includes("quay")).length,d=t.status==="Đã hoàn thành"||t.status==="Nhận Feedback";return`
    <div class="job-card glass-panel swipe-container" data-job-id="${t.id}" style="padding: 0; position: relative; border-radius: 12px; overflow: hidden; transform: translateZ(0); ${d?"border-left: 4px solid #22c55e; opacity: 0.85; background: rgba(34,197,94,0.03)":""}" oncontextmenu="return false;">
      
      <!-- Lớp nền nút bấm khi trượt thẻ (Swipe Actions) -->
      <div class="swipe-action left-action" style="position: absolute; left: 0; top: 0; bottom: 0; width: 100px; background: #ef4444; color: white; display: flex; align-items: center; justify-content: flex-start; padding-left: 1.5rem; font-size: 1.5rem; border-radius: 12px 0 0 12px; z-index: 1; opacity: 0; transition: opacity 0.2s;">
        <i class="fas fa-trash-alt"></i>
      </div>
      <div class="swipe-action right-action" style="position: absolute; right: 0; top: 0; bottom: 0; width: 100px; background: #0088cc; color: white; display: flex; align-items: center; justify-content: flex-end; padding-right: 1.5rem; font-size: 1.5rem; border-radius: 0 12px 12px 0; z-index: 1; opacity: 0; transition: opacity 0.2s;">
        <i class="fas fa-comment-dots"></i>
      </div>

      <!-- Nội dung chính của thẻ (Lớp trên cùng) -->
      <div class="swipe-content" onclick="window.openQuickPreview('${t.id}')" style="position: relative; z-index: 2; background: var(--bg-card); padding: 1.25rem; transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); width: 100%; border-radius: inherit; box-shadow: -2px 0 10px rgba(0,0,0,0.05);">
        
        <div class="job-card-header" style="margin-bottom: 0.5rem">
        <div style="display: flex; flex-direction: column; gap: 0.1rem">
          <h3 class="job-card-title" style="font-size: 1.08rem; color: var(--text-main)">${t.client}</h3>
          <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap">
            <span style="font-size: 0.85rem; color: var(--text-dim)">${(()=>{const p=t.eventDays&&t.eventDays.length>1?t.eventDays:null;if(p){const c=p.map(f=>f.date).filter(Boolean).sort();return c.length>1?new Date(c[0]).toLocaleDateString("vi-VN")+" → "+new Date(c[c.length-1]).toLocaleDateString("vi-VN"):new Date(t.date).toLocaleDateString("vi-VN")}return new Date(t.date).toLocaleDateString("vi-VN")})()}</span>
            ${t.eventDays&&t.eventDays.length>1?`<span class="multi-day-badge">📅 ${t.eventDays.length} ngày</span>`:""}
            ${t.clientRating?`<span style="font-size: 0.7rem; letter-spacing: 1px">${"⭐".repeat(t.clientRating)}${"☆".repeat(5-t.clientRating)}</span>`:""}
            ${(t.clientTags||[]).map(p=>{const c={VIP:"#eab308","Khó tính":"#ef4444","Dễ thương":"#22c55e","Quay lại":"#3b82f6",Mới:"#8b5cf6"};return`<span style="font-size:0.55rem;font-weight:800;padding:0.1rem 0.35rem;border-radius:4px;background:${c[p]||"#64748b"}15;color:${c[p]||"#64748b"};border:1px solid ${c[p]||"#64748b"}25">${p}</span>`}).join("")}
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.25rem">
           <div style="display: flex; gap: 0.3rem">
              ${window.state&&window.state.locks&&window.state.locks[t.id]?`<span class="badge" title="Đang được sửa bởi ${window.state.locks[t.id]}" style="background: rgba(245,158,11,0.1); color: #f59e0b; font-size: 0.55rem">🔒 ${window.state.locks[t.id]}</span>`:""}
              ${t.visibility?"":'<span class="badge" style="background: rgba(239,68,68,0.1); color: #ef4444; font-size: 0.55rem">Ẩn</span>'}
              <div class="job-id-badge" style="font-size: 0.55rem">#${t.jobNo||0}</div>
           </div>
           <div class="job-status-pill status-${n}">${t.status}</div>
        </div>
      </div>

      <div class="job-card-body" style="border-top: 1px solid var(--border); padding-top: 0.5rem">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem">
           <div style="display: flex; flex-direction: column">
              <span style="font-size: 0.9rem; font-weight: 800; color: var(--accent)">${t.eventType||"Dự án Wedding"}</span>
              <span style="font-size: 0.65rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.3rem">
                <i class="fas fa-location-dot" style="font-size: 0.82rem"></i> ${t.venue||"Chưa cập địa điểm"}
              </span>
           </div>
           <div style="text-align: right">
              <span style="font-size: 0.82rem; color: var(--text-dim); display: block">chụp ${a} · quay ${l}</span>
              <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-dim); margin-top: 0.2rem">
                ${t.phone?`<a href="tel:${t.phone.replace(/[^0-9+]/g,"")}" style="color:inherit;text-decoration:none"><span style="color:var(--primary)">📞</span> ${t.phone}</a> <a href="https://zalo.me/${t.phone.replace(/[^0-9]/g,"")}" target="_blank" style="background:#0068ff;color:#fff;padding:0.1rem 0.3rem;border-radius:4px;font-size:0.65rem;text-decoration:none;margin-left:0.3rem">Zalo</a>`:""}
              </div>
           </div>
        </div>

        <div style="display: flex; gap: 1rem; margin-bottom: 0.5rem; background: rgba(255,255,255,0.02); padding: 0.5rem; border-radius: 6px">
           ${(()=>{const p=t.eventDays&&t.eventDays.length>0?t.eventDays[0].timeline:t.timeline;return`<div style="flex: 1">
              <label style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-dim); font-weight:700; display: block">Lễ Ceremony</label>
              <span style="font-size: 0.9rem; font-weight: 800; color: #f97316">${p?.le||"--:--"}</span>
           </div>
           <div style="flex: 1">
              <label style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-dim); font-weight:700; display: block">Tiệc Party</label>
              <span style="font-size: 0.9rem; font-weight: 800; color: #f97316">${p?.tiec||"--:--"}</span>
           </div>`})()}
        </div>

        <div class="job-details-list" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem">
          ${(()=>{const p=new Date;p.setHours(0,0,0,0);const c=new Date(t.date);c.setHours(0,0,0,0);const f=new Date(c);f.setDate(f.getDate()+15);const u=new Date(c);u.setDate(u.getDate()+30);const h=t.status!=="Đã hoàn thành"&&t.status!=="Nhận Feedback",v=h&&f<p,g=h&&u<p;return`
               <div style="background: ${v?"rgba(239,68,68,0.1)":"rgba(59,130,246,0.05)"}; padding: 0.3rem; border-radius: 4px; border: 1px solid ${v?"rgba(239,68,68,0.3)":"transparent"}">
                 <label style="font-size: 0.72rem; color: ${v?"#ef4444":"var(--text-dim)"}; font-weight: ${v?"800":"600"}">${v?"⚠️ DL Photo":"DL Photo"}</label>
                 <span style="font-size: 0.82rem; font-weight: 800; font-family: monospace; display: block; color: ${v?"#ef4444":"inherit"}">${e.photo}</span>
               </div>
               <div style="background: ${g?"rgba(239,68,68,0.1)":"rgba(236,72,153,0.05)"}; padding: 0.3rem; border-radius: 4px; border: 1px solid ${g?"rgba(239,68,68,0.3)":"transparent"}">
                 <label style="font-size: 0.72rem; color: ${g?"#ef4444":"var(--text-dim)"}; font-weight: ${g?"800":"600"}">${g?"⚠️ DL Video":"DL Video"}</label>
                 <span style="font-size: 0.82rem; font-weight: 800; font-family: monospace; display: block; color: ${g?"#ef4444":"inherit"}">${e.video}</span>
               </div>
             `})()}
        </div>

        <div style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-dim)">
           <i class="fas fa-users-viewfinder" style="margin-right: 0.3rem; color:var(--text-dim)"></i>
           ${Wa(t)}</div>
      </div>

      <div class="job-card-footer" style="margin-top: 0.75rem; border-top: 1px dashed var(--border); padding-top: 0.5rem">
         ${window.state?.currentUser?.role!=="admin"?"":`
         <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem">
            <div style="font-size: 0.82rem"><span style="color: var(--text-dim)">Gói:</span> ${D(t.package)}</div>
            <div style="font-size: 0.82rem"><span style="color: var(--text-dim)">Cọc</span> ${D(t.deposit||0)}</div>
            <div style="font-size: 0.82rem"><span style="color: var(--text-dim)">Thợ:</span> ${D(r)}</div>
            <div style="font-size: 0.82rem"><span style="color: var(--text-dim)">Edit:</span> ${D(o||0)}</div>
         </div>
         <div class="profit-estimate" style="background: rgba(22,163,74,0.07); padding: 0.4rem 0.6rem; border-radius: 8px; border: 1px solid rgba(22,163,74,0.12); display: flex; justify-content: space-between; align-items: center">
            <label style="font-size: 0.82rem; font-weight: 700">Lợi / Lỗ (tạm tính):</label>
            <span class="value" style="font-size: 0.85rem; font-weight: 900; color: ${s>=0?"var(--success)":"var(--danger)"}">${D(s)}</span>
         </div>
         `}
         <div style="display:flex;gap:0.4rem;justify-content:flex-end;align-items:center;margin-top:0.5rem" onclick="event.stopPropagation()">
            ${t.linkNAS?`<a href="${t.linkNAS}" target="_blank" class="btn btn-sm" style="font-size:0.68rem;padding:0.2rem 0.5rem;background:#2563eb15;color:#2563eb;border:1px solid #2563eb30;border-radius:6px;text-decoration:none">📁 NAS</a>`:""}
            ${t.linkDrive?`<a href="${t.linkDrive}" target="_blank" class="btn btn-sm" style="font-size:0.68rem;padding:0.2rem 0.5rem;background:#16a34a15;color:#15803d;border:1px solid #16a34a30;border-radius:6px;text-decoration:none">🔗 Drive</a>`:""}
         </div>
         <div class="view-detail-link" style="font-size: 0.82rem; text-align: center; margin-top: 0.35rem; opacity: 0.7">Xem chi tiết &rarr;</div>
         <div onclick="event.stopPropagation()" style="margin-top:0.5rem"><button onclick="window.toggleJobComplete&&window.toggleJobComplete('${t.id}')" style="width:100%;padding:0.35rem;border-radius:6px;font-size:0.72rem;font-weight:800;cursor:pointer;border:none;font-family:inherit;transition:all 0.2s;${d?"background:#22c55e;color:#fff":"background:#22c55e15;color:#22c55e;border:1px solid #22c55e30"}">${d?"✅ Đã hoàn thành":"⭕ Đánh dấu hoàn thành"}</button></div>
      </div>

      <div onclick="event.stopPropagation()" style="border-top:1px solid var(--border);padding-top:0.4rem;margin-top:0.3rem">
        <!-- ✅ Checklist progress dots -->
        ${(()=>{const p=t.checklist||{},c=[{key:"contractSigned",label:"HĐ",color:"#2563eb"},{key:"depositReceived",label:"Cọc",color:"#16a34a"},{key:"albumDelivered",label:"Album",color:"#9333ea"},{key:"fullyPaid",label:"Tất toán",color:"#dc2626"}],f=c.filter(h=>p[h.key]).length,u=f===4?"#16a34a":f>0?"#f59e0b":"var(--text-dim)";return`<div style="display:flex;align-items:center;gap:0.35rem;margin-bottom:0.35rem">
          ${c.map(h=>{const v=p[h.key]?h.color:"var(--border)";return`<span title="${h.label}" style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${v};flex-shrink:0"></span>`}).join("")}
          <span style="font-size:0.58rem;font-weight:800;color:${u};margin-left:2px">${f}/4${f===4?" ✅":""}</span>
        </div>`})()}
        <div style="display:flex;align-items:center;gap:0.3rem;margin-bottom:0.3rem">
          <span style="font-size:0.65rem;color:var(--text-dim);font-weight:700">Đánh giá:</span>
          ${[1,2,3,4,5].map(p=>`<span onclick="window.updateClientRating('${t.id}',${p})" style="cursor:pointer;font-size:0.85rem;opacity:${(t.clientRating||0)>=p?1:.3}">${(t.clientRating||0)>=p?"⭐":"☆"}</span>`).join("")}
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:0.2rem">
          ${["VIP","Khó tính","Dễ thương","Quay lại","Mới"].map(p=>{const c=(t.clientTags||[]).includes(p),f={VIP:"#eab308","Khó tính":"#ef4444","Dễ thương":"#22c55e","Quay lại":"#3b82f6",Mới:"#8b5cf6"};return`<span onclick="window.toggleClientTag('${t.id}','${p}')" style="cursor:pointer;font-size:0.58rem;font-weight:800;padding:0.15rem 0.35rem;border-radius:4px;border:1px solid ${f[p]}${c?"":"30"};background:${f[p]}${c?"20":"05"};color:${f[p]};opacity:${c?1:.5};transition:all 0.2s">${p}</span>`}).join("")}
          <span onclick="window.openChat('${t.id}')" style="cursor:pointer;font-size:0.58rem;font-weight:800;padding:0.15rem 0.4rem;border-radius:4px;background:var(--primary-glow);color:var(--primary);border:1px solid var(--border-bright);margin-left:auto">💬 ${(t.comments||[]).length}</span>
          <span onclick="window.cloneJobAsTemplate('${t.id}')" style="cursor:pointer;font-size:0.58rem;font-weight:800;padding:0.15rem 0.4rem;border-radius:4px;background:#8b5cf620;color:#8b5cf6;border:1px solid #8b5cf630" title="Dùng làm template">📋 Clone</span>
        </div>
      </div>
    </div>
    </div>
  `}catch(e){return console.error("Lỗi renderJobCard:",e,t),`<div class="job-card glass-panel" style="border:1px solid var(--danger); opacity:0.6; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding:1rem;">
      <i class="fas fa-exclamation-triangle" style="color:var(--danger); font-size:1.5rem; margin-bottom:0.5rem"></i>
      <div style="font-size:0.8rem; font-weight:700">Lỗi Dữ Liệu Job ID: ${t?.id||"Unknown"}</div>
      <div style="font-size:0.65rem; color:var(--text-dim)">Vui lòng liên hệ Kỹ thuật viên</div>
    </div>`}}function xo(t,e){if(t.modal.type==="quick_preview")return qa(t,e);const n=document.createElement("div");n.className="modal-overlay active",n.onclick=s=>{s.target===n&&e()};const i=document.createElement("div");switch(i.className="modal-container",t.modal.type){case"job_detail":i.appendChild(Ga(t));break;case"add_job":i.appendChild(Ka(t));break;case"pa3_report":i.appendChild(Ya(t));break;case"global_search":i.appendChild(Bo(t));break}n.appendChild(i);let r=null,o=null;return i.addEventListener("touchstart",s=>{const a=i.scrollTop<=5,l=s.target.closest(".modal-header")||i===s.target;window.innerWidth<=768&&(a||l)?(r=s.touches[0].clientY,i.style.transition="none"):r=null},{passive:!0}),i.addEventListener("touchmove",s=>{if(r===null)return;o=s.touches[0].clientY;const a=o-r;a>0&&(i.style.transform=`translateY(${a}px)`)},{passive:!0}),i.addEventListener("touchend",()=>{if(r===null||o===null)return;const s=o-r;i.style.transition="transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",s>120?e():i.style.transform="",r=null,o=null}),n}function qa(t,e){const n=t.jobs.find(l=>l.id===t.modal.data),i=document.createElement("div");i.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:9999;transition:opacity 0.3s",i.onclick=l=>{l.target===i&&e()};const r=document.createElement("div");if(r.style.cssText="position:fixed;top:0;right:0;bottom:0;width:400px;max-width:100%;background:var(--bg-main);box-shadow:-4px 0 24px rgba(0,0,0,0.1);z-index:10000;transform:translateX(100%);transition:transform 0.3s cubic-bezier(0.16,1,0.3,1);display:flex;flex-direction:column;overflow-y:auto",setTimeout(()=>{r.style.transform="translateX(0)"},10),!n)return i;const o=(n.services||[]).filter(l=>l.staff&&l.service),s=n.deliverables||[],a=n.status==="Đã hoàn thành"?"#15803d":n.status==="Đang edit"?"#db2777":"#4a6b4a";return r.innerHTML=`
    <div style="background:var(--bg-card);padding:1.5rem;border-bottom:1px solid var(--border);position:sticky;top:0;z-index:10">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <div style="font-size:0.75rem;font-weight:800;color:var(--primary);margin-bottom:0.2rem">#${n.jobNo||"00"}</div>
          <h2 style="font-size:1.3rem;font-weight:900;color:var(--text-main);margin:0 0 0.3rem 0">${n.client}</h2>
          <span style="font-size:0.72rem;font-weight:700;color:${a};background:${a}15;padding:0.15rem 0.5rem;border-radius:4px">${n.status}</span>
        </div>
        <button onclick="window.closeModal()" style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:var(--text-dim)">&times;</button>
      </div>
    </div>
    <div style="padding:1.5rem;flex:1;display:flex;flex-direction:column;gap:1.5rem">
      <div>
        <h4 style="font-size:0.8rem;text-transform:uppercase;color:var(--text-dim);font-weight:800;margin:0 0 0.5rem 0">📌 Thông tin chung</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.8rem">
          <div><label style="font-size:0.65rem;color:var(--text-dim)">Ngày lễ</label><div style="font-size:0.85rem;font-weight:700">${new Date(n.date).toLocaleDateString("vi-VN")}</div></div>
          <div><label style="font-size:0.65rem;color:var(--text-dim)">Loại sự kiện</label><div style="font-size:0.85rem;font-weight:700;color:var(--accent)">${n.eventType||"Wedding"}</div></div>
          <div style="grid-column:1/3"><label style="font-size:0.65rem;color:var(--text-dim)">Liên hệ</label><div style="font-size:0.85rem;font-weight:700">${n.phone?`<a href="tel:${n.phone.replace(/[^0-9+]/g,"")}" style="color:inherit;text-decoration:none">📞 ${n.phone}</a> <a href="https://zalo.me/${n.phone.replace(/[^0-9]/g,"")}" target="_blank" style="background:#0068ff;color:#fff;padding:0.1rem 0.4rem;border-radius:4px;font-size:0.65rem;text-decoration:none;margin-left:0.4rem">Zalo</a>`:"—"}</div></div>
        </div>
      </div>
      <div>
        <h4 style="font-size:0.8rem;text-transform:uppercase;color:var(--text-dim);font-weight:800;margin:0 0 0.5rem 0">📹 Nhân sự đi quay/chụp</h4>
        ${o.length>0?o.map(l=>`
          <div style="display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:1px solid var(--border)">
            <span style="font-size:0.8rem;color:var(--text-main)">${l.service}</span>
            <span style="font-size:0.8rem;font-weight:700">📷 ${l.staff}</span>
          </div>`).join(""):'<div style="font-size:0.75rem;color:var(--text-dim)">Chưa có dữ liệu</div>'}
      </div>
      <div>
        <h4 style="font-size:0.8rem;text-transform:uppercase;color:var(--text-dim);font-weight:800;margin:0 0 0.5rem 0">🎬 Tiến độ Thành phẩm</h4>
        ${s.length>0?s.map(l=>`
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:6px;padding:0.6rem;margin-bottom:0.4rem">
            <div style="display:flex;justify-content:space-between;margin-bottom:0.2rem">
              <span style="font-size:0.8rem;font-weight:700">${l.name} <span style="font-size:0.65rem;color:var(--text-dim)">(x${l.quantity||1})</span></span>
              <span style="font-size:0.65rem;color:${l.editStatus==="Hoàn thành"?"#22c55e":"#f97316"};font-weight:700">${l.editStatus||"Chưa bắt đầu"}</span>
            </div>
            <div style="font-size:0.7rem;color:var(--text-dim)">Nhân sự: <b>${l.editor||"Trống"}</b></div>
          </div>`).join(""):'<div style="font-size:0.75rem;color:var(--text-dim)">Không có thành phẩm đầu ra</div>'}
      </div>
      <div style="margin-top:0.75rem">
        ${(()=>{const l=s.length,d=s.filter(f=>f.editStatus==="Hoàn thành").length;if(l===0)return'<div style="font-size:0.72rem;color:var(--text-dim)">Không có thành phẩm</div>';const p=Math.round(d/l*100),c=p===100?"#22c55e":p>=50?"#f97316":"#ef4444";return`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.3rem">
              <span style="font-size:0.68rem;font-weight:700;color:var(--text-dim)">Tiến độ dự án</span>
              <span style="font-size:0.75rem;font-weight:900;color:${c}">${d}/${l} · ${p}%</span>
            </div>
            <div style="width:100%;height:8px;background:var(--border);border-radius:4px;overflow:hidden;margin-bottom:0.6rem">
              <div style="width:${p}%;height:100%;background:${c};border-radius:4px;transition:width 0.4s ease"></div>
            </div>
          `})()}
      </div>
      ${n.linkNAS?`<div style="padding:0.5rem 0.8rem;background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.2);border-radius:6px;margin-top:0.25rem"><div style="font-size:0.62rem;color:var(--text-dim);margin-bottom:0.15rem">📂 NAS Path</div><div style="font-size:0.72rem;font-weight:700;color:#3b82f6;word-break:break-all">${n.linkNAS}</div></div>`:""}

      <!-- ✅ CHECKLIST nhanh -->
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:0.75rem;margin-top:0.5rem">
        <div style="font-size:0.65rem;font-weight:800;text-transform:uppercase;color:var(--text-dim);margin-bottom:0.5rem">✅ Tiến trình hợp đồng</div>
        ${[{key:"contractSigned",label:"📄 Hợp đồng đã ký",color:"#2563eb"},{key:"depositReceived",label:"💰 Đã nhận cọc",color:"#16a34a"},{key:"albumDelivered",label:"🖼️ Đã giao album",color:"#9333ea"},{key:"fullyPaid",label:"✅ Đã tất toán",color:"#dc2626"}].map(l=>{const d=!!(n.checklist||{})[l.key];return`<label style="display:flex;align-items:center;gap:0.5rem;padding:0.3rem 0.4rem;cursor:pointer;border-radius:6px;${d?`background:${l.color}10`:""}">
            <input type="checkbox" ${d?"checked":""} onchange="window.toggleJobChecklist('${n.id}','${l.key}',this.checked)"
              style="width:14px;height:14px;accent-color:${l.color};cursor:pointer;flex-shrink:0">
            <span style="font-size:0.78rem;font-weight:${d?"800":"600"};color:${d?l.color:"var(--text-dim)"};text-decoration:${d?"line-through":"none"}">${l.label}</span>
          </label>`}).join("")}
      </div>

      <!-- 💬 ZALO nhanh -->
      <div style="background:var(--bg-card);border:1px solid rgba(0,132,255,0.2);border-radius:10px;padding:0.75rem;margin-top:0.4rem">
        <div style="font-size:0.65rem;font-weight:800;text-transform:uppercase;color:#0084ff;margin-bottom:0.5rem">💬 Nhắn Zalo nhanh</div>
        <div style="display:flex;flex-direction:column;gap:0.3rem">
          ${[{label:"📅 Nhắc ngày chụp",msg:`Chào anh/chị ${n.client}! 🌸
Haru Studio xin nhắc lịch ngày ${new Date(n.date).toLocaleDateString("vi-VN")} của mình ạ.
Cảm ơn anh/chị! 💕`},{label:"🖼️ Album đã xong",msg:`Chào anh/chị ${n.client}! 🌸
Album của mình đã hoàn thành! Xem tại:
${n.linkCustomer||"[Chèn link album]"}
Haru Studio mong nhận feedback của anh/chị! 💕`},{label:"💰 Nhắc thanh toán",msg:`Chào anh/chị ${n.client}! 🌸
Phần thanh toán còn lại: ${((n.package||0)-(n.deposit||0)).toLocaleString("vi-VN")}đ.
Anh/chị vui lòng sắp xếp. Cảm ơn! 💕`}].map(l=>`<button onclick="navigator.clipboard.writeText('${l.msg.replace(/'/g,"\\'")}').then(()=>window.showToast&&window.showToast('📋 Đã copy tin nhắn!'))"
            style="text-align:left;padding:0.35rem 0.55rem;border-radius:6px;font-size:0.75rem;font-weight:700;cursor:pointer;border:1px solid rgba(0,132,255,0.15);background:rgba(0,132,255,0.04);color:#0050b3"
            onmouseover="this.style.background='rgba(0,132,255,0.1)'" onmouseout="this.style.background='rgba(0,132,255,0.04)'">${l.label}</button>`).join("")}
        </div>
      </div>

      <div style="margin-top:auto;padding-top:1rem;display:flex;flex-direction:column;gap:0.5rem">
        <button onclick="window.closeModal(); setTimeout(() => window.openModal('job_detail', '${n.id}'), 100)" style="width:100%;padding:0.8rem;background:var(--primary);color:#fff;border:none;border-radius:8px;font-weight:800;font-size:0.9rem;cursor:pointer;box-shadow:0 4px 12px rgba(22,163,74,0.2)">✏️ Chỉnh sửa nâng cao</button>
        <button onclick="window.deleteJob('${n.id}')" style="width:100%;padding:0.6rem;background:transparent;color:var(--danger);border:1.5px solid var(--danger);border-radius:8px;font-weight:700;font-size:0.85rem;cursor:pointer">🗑 Xóa dự án</button>
      </div>


    </div>
  `,i.appendChild(r),i.dataset.closeFn="quickPreviewClose",window._quickPreviewCloseFn=()=>{r.style.transform="translateX(100%)",i.style.opacity="0",setTimeout(()=>{i.remove(),t.modal.isOpen=!1,t.modal.type=null},300)},i}function Ga(t){const e=t.jobs.find(c=>c.id===t.modal.data),n=document.createElement("div");if(!e)return n;const i=(e.services||[]).filter(ft),r=e.package||0,o=i.reduce((c,f)=>c+(f.cost||0),0),s=i.reduce((c,f)=>c+(f.edit||0),0),a=r-(o+s),l=r-(e.deposit||0);(e.services||[]).map((c,f)=>({s:c,idx:f})).filter(c=>ft(c.s));const p={"Chưa gửi":"#b45309","Nhận Feedback":"#2563eb","Đã hoàn thành":"#15803d","Đang edit":"#db2777"}[e.status]||"#4a6b4a";return n.innerHTML=`
    <!-- MODAL HEADER: brand bar -->
    <div class="modal-header" style="padding: 1.25rem 1.75rem 1rem; gap: 1rem">
      <div style="display: flex; align-items: center; gap: 0.875rem; min-width: 0">
        <div style="background: var(--primary); color: #fff; font-size: 0.8rem; font-weight: 900;
          padding: 0.3rem 0.7rem; border-radius: 8px; flex-shrink: 0">#${e.jobNo||0}</div>
        <div style="min-width: 0">
          <h2 style="margin: 0; font-size: 1.4rem; font-weight: 900; color: var(--text-main);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${e.client}</h2>
          <div style="display: flex; align-items: center; gap: 0.6rem; margin-top: 0.25rem">
            <span style="font-size: 0.82rem; color: var(--text-dim)">${new Date(e.date).toLocaleDateString("vi-VN",{weekday:"short",day:"2-digit",month:"2-digit",year:"numeric"})}</span>
            <span style="font-size: 0.75rem; font-weight: 700; padding: 0.15rem 0.6rem; border-radius: 6px;
              background: ${p}18; color: ${p}; border: 1px solid ${p}30">${e.status}</span>
            <span style="font-size: 0.78rem; color: var(--accent); font-weight: 700">${e.eventType||"Wedding"}</span>
          </div>
        </div>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center">
        <button onclick="window.shareJobLink('${e.id}')" style="display: flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.75rem; font-size: 0.8rem; font-weight: 800; border-radius: 8px; border: 1px solid var(--border-bright); background: #fff; cursor: pointer; color: var(--text-dim); transition: 0.2s" onmouseover="this.style.borderColor='#2563eb';this.style.color='#2563eb'" onmouseout="this.style.borderColor='var(--border-bright)';this.style.color='var(--text-dim)'">
          <i class="fas fa-share-alt" style="color: #2563eb"></i> Share
        </button>
        <button onclick="window.exportInvoiceToPDF('${e.id}')" style="display: flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.75rem; font-size: 0.8rem; font-weight: 800; border-radius: 8px; border: 1px solid var(--border-bright); background: #fff; cursor: pointer; color: var(--text-dim); transition: 0.2s" onmouseover="this.style.borderColor='#ef4444';this.style.color='#ef4444'" onmouseout="this.style.borderColor='var(--border-bright)';this.style.color='var(--text-dim)'">
          <i class="fas fa-file-pdf" style="color: #ef4444"></i> PDF
        </button>
        <button class="close-btn" onclick="window.closeModal()">&#x2715;</button>
      </div>
    </div>

    <!-- MODAL BODY: 2 cols -->
    <div class="modal-body" style="padding: 1.25rem 1.75rem 1.75rem">
      <div id="form-validation-errors" style="display:none; background: #fef2f2; border: 1px solid #fca5a5;
        border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1rem; color: #b91c1c; font-size: 0.9rem"></div>

      <!-- 📅 TIMELINE PROGRESS BAR -->
      ${(()=>{const c=[{label:"Quay/Chụp",icon:"📸"},{label:"Hậu kỳ",icon:"🎬"},{label:"Review",icon:"👀"},{label:"Giao hàng",icon:"📦"}],f=e.checklist||{},u=i.some(b=>(Array.isArray(b.service)?b.service.join(" "):b.service||"").toLowerCase().includes("quay")),h=i.every(b=>!(Array.isArray(b.service)?b.service.join(" "):b.service||"").toLowerCase().includes("quay")||b.editStatus==="Hoàn thành"),g=new Date(e.date)<new Date;let _=0;return g&&(_=1),u&&h&&(_=2),(e.status==="Đã hoàn thành"||f.albumDelivered)&&(_=3),f.fullyPaid&&f.albumDelivered&&(_=4),`<div style="display:flex;align-items:center;gap:0;margin-bottom:1.25rem;padding:0.8rem 1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:10px">
          ${c.map((b,y)=>{const x=y<_,T=y===_,$=x?"var(--primary)":"var(--border)";return`${y>0?`<div style="flex:1;height:3px;background:${$};border-radius:2px"></div>`:""}
              <div style="display:flex;flex-direction:column;align-items:center;gap:0.15rem;min-width:56px">
                <div style="width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:900;${x?"background:var(--primary);color:#fff":T?"background:var(--primary-glow);color:var(--primary);border:2px solid var(--primary)":"background:var(--bg-hover);color:var(--text-dim);border:1px solid var(--border)"}">${x?"✓":b.icon}</div>
                <span style="font-size:0.58rem;font-weight:${T?800:600};color:${x?"var(--primary)":T?"var(--text-main)":"var(--text-dim)"}">${b.label}</span>
              </div>`}).join("")}
        </div>`})()}
      <div style="display: grid; grid-template-columns: 1fr 320px; gap: 1.5rem; align-items: start">

        <!-- LEFT COLUMN: all editable fields -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem">

          <!-- Row 1: core info -->
          <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 0.875rem">
            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Khách hàng (CD - CR)</label>
              <input type="text" id="edit-job-client" class="form-control" value="${e.client}"
                style="font-size: 0.95rem; padding: 0.55rem 0.75rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main); font-weight: 700">
            </div>
            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Trạng thái</label>
              <select id="edit-job-status" class="form-control"
                style="font-size: 0.95rem; padding: 0.55rem 0.75rem; background: #fff; border: 1.5px solid var(--border); color: ${p}; font-weight: 700">
                ${["Chưa gửi","Đang edit","Nhận Feedback","Đã hoàn thành"].map(c=>`<option value="${c}" ${e.status===c?"selected":""} style="color: var(--text-main)">${c}</option>`).join("")}
              </select>
            </div>
            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Ngày làm lễ</label>
              <input type="date" id="edit-job-date" class="form-control" value="${e.date}"
                style="font-size: 0.95rem; padding: 0.55rem 0.75rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main)">
            </div>
            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Loại hình</label>
              <input type="text" id="edit-job-type" class="form-control" value="${e.eventType||"Wedding"}"
                style="font-size: 0.95rem; padding: 0.55rem 0.75rem; background: #fff; border: 1.5px solid var(--border); color: var(--accent); font-weight: 700">
            </div>
            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Liên lạc</label>
              <div style="display: flex; gap: 0.4rem; align-items: center">
                <input type="text" id="edit-job-phone" class="form-control" value="${e.phone||""}"
                  style="font-size: 0.95rem; padding: 0.55rem 0.75rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main); flex: 1">
                <a href="https://zalo.me/${e.phone}" target="_blank"
                  style="background: #0084ff; color: #fff; font-size: 0.72rem; font-weight: 800; padding: 0.4rem 0.6rem; border-radius: 7px; text-decoration: none; white-space: nowrap">Zalo</a>
              </div>
            </div>
          </div>

          <!-- Row 2: finance -->
          ${window.state?.currentUser?.role!=="admin"?"":`
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.875rem; background: rgba(22,163,74,0.04); padding: 1rem; border-radius: 10px; border: 1px solid var(--border)">
            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Giá trị gói (VNĐ)</label>
              <input type="number" inputmode="numeric" pattern="[0-9]*" id="edit-job-package" class="form-control" value="${e.package}"
                style="font-size: 1rem; padding: 0.55rem 0.75rem; background: #fff; border: 1.5px solid var(--border-bright); color: var(--text-main); font-weight: 800">
            </div>
            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Cọc đã nhận</label>
              <input type="number" inputmode="numeric" pattern="[0-9]*" id="edit-job-deposit" class="form-control" value="${e.deposit||0}"
                style="font-size: 1rem; padding: 0.55rem 0.75rem; background: #fff; border: 1.5px solid var(--border); color: var(--success); font-weight: 700">
            </div>
            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Còn lại</label>
              <div style="font-size: 1rem; font-weight: 800; color: var(--warning); padding: 0.55rem 0.75rem; background: rgba(234,88,12,0.06); border-radius: 8px; border: 1px solid rgba(234,88,12,0.15)">
                ${D(l)}
              </div>
            </div>
          </div>
          `}

          <!-- Row 3: ghi chú -->
          <div>
            <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Ghi chú nội bộ</label>
            <textarea id="edit-job-notes" class="form-control" rows="2"
              style="font-size: 0.92rem; padding: 0.55rem 0.75rem; background: #fff; border: 1.5px solid var(--border); resize: vertical; color: var(--text-main)">${e.notes||""}</textarea>
          </div>

          <!-- Row 4: MULTI-DAY EVENT MANAGEMENT -->
          <div>
            <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.5rem">📅 Lịch trình sự kiện (theo ngày)</label>
            ${(()=>{const c=e.eventDays&&e.eventDays.length>0?e.eventDays:[{dayLabel:"Ngày chính",date:e.date||"",boyHouse:e.boyHouse||"",girlHouse:e.girlHouse||"",venue:e.venue||"",timeline:e.timeline||{le_sang:!1,le:"05:00",tiec_trua:!1,tiec_trua_time:"11:00",tiec_toi:!1,tiec:"18:00"},categories:(e.services||[]).map(h=>h.service).filter((h,v,g)=>g.indexOf(h)===v)}],f=c.map((h,v)=>`
        <button type="button" class="day-tab-btn ${v===0?"active":""}" data-day-idx="${v}" onclick="window._switchDayTab(${v})">
          ${h.dayLabel||"Ngày "+(v+1)}
        </button>
      `).join(""),u=c.map((h,v)=>{const g=h.timeline||{};return`
        <div class="day-tab-content ${v===0?"active":""}" data-day-idx="${v}">
          <div class="day-form-panel">
            <div class="day-header">
              <h4>📋 ${h.dayLabel||"Ngày "+(v+1)}</h4>
              ${c.length>1?`<button type="button" class="remove-day-btn" onclick="window._removeDayTab(${v})">✕ Xóa ngày này</button>`:""}
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem">
              <div>
                <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Tên nhãn ngày</label>
                <input type="text" class="form-control day-label-input" data-day="${v}" value="${h.dayLabel||""}" placeholder="VD: Lễ gia tiên, Tiệc cưới..."
                  style="font-size: 0.92rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--primary); font-weight: 700">
              </div>
              <div>
                <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Ngày tổ chức</label>
                <input type="date" class="form-control day-date-input" data-day="${v}" value="${h.date||""}"
                  style="font-size: 0.92rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main)">
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem">
              <div>
                <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">🏠 Nhà Trai</label>
                <input type="text" class="form-control day-boy-house-input" data-day="${v}" value="${h.boyHouse||""}" placeholder="Địa chỉ nhà trai"
                  style="font-size: 0.88rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main)">
              </div>
              <div>
                <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">🏠 Nhà Gái</label>
                <input type="text" class="form-control day-girl-house-input" data-day="${v}" value="${h.girlHouse||""}" placeholder="Địa chỉ nhà gái"
                  style="font-size: 0.88rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main)">
              </div>
              <div>
                <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">🏨 Venue / Tiệc</label>
                <input type="text" class="form-control day-venue-input" data-day="${v}" value="${h.venue||""}" placeholder="Nhà hàng / địa điểm"
                  style="font-size: 0.88rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--accent); font-weight: 700">
              </div>
            </div>

            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.4rem">⏰ Lịch trình</label>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.6rem">
                ${[["le_sang","Lễ sáng",g.le_sang,"le",g.le||"05:00","#f97316"],["tiec_trua","Tiệc trưa",g.tiec_trua,"tiec_trua_time",g.tiec_trua_time||"11:00","#22c55e"],["tiec_toi","Tiệc tối",g.tiec_toi,"tiec",g.tiec||"18:00","#3b82f6"]].map(([_,b,y,x,T,$])=>`
                  <div style="background: ${y?$+"0d":"#fff"}; border: 1.5px solid ${y?$+"40":"var(--border)"}; border-radius: 10px; padding: 0.6rem">
                    <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; font-weight: 700; color: ${y?$:"var(--text-dim)"}; margin-bottom: 0.35rem; cursor: pointer">
                      <input type="checkbox" class="day-tl-check" data-day="${v}" data-tl="${_}" ${y?"checked":""}> ${b}
                    </label>
                    <input type="time" class="form-control day-tl-time" data-day="${v}" data-tl-time="${x}" value="${T}"
                      style="padding: 0.25rem 0.4rem; font-size: 0.85rem; font-weight: 700; background: #fff; border: 1px solid var(--border); color: ${$}">
                  </div>
                `).join("")}
              </div>
            </div>

            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.4rem">🎬 Hạng mục quay/chụp</label>
              <div style="display: flex; flex-wrap: wrap; gap: 0.35rem">
                ${(window.state?.settings?.eventCategories||[]).map(_=>{const b=(h.categories||[]).includes(_);return`<label style="display: flex; align-items: center; gap: 0.3rem; font-size: 0.78rem; font-weight: 700; padding: 0.3rem 0.65rem; border-radius: 8px; cursor: pointer; border: 1.5px solid ${b?"var(--primary-light)":"var(--border)"}; background: ${b?"rgba(22,163,74,0.08)":"#fff"}; color: ${b?"var(--primary)":"var(--text-dim)"}; transition: all 0.2s">
                    <input type="checkbox" class="day-cat-check" data-day="${v}" value="${_}" ${b?"checked":""} style="display:none"> ${_}
                  </label>`}).join("")}
              </div>
            </div>

            <!-- Inline Services/Staff for This Specific Day -->
            <div style="margin-top: 1rem; border-top: 1px dashed var(--border); padding-top: 1rem">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem">
                <label style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--primary)">👥 Nhân sự đi làm (${h.date||e.date})</label>
                <div style="display: flex; gap: 0.4rem">
                  <button type="button" class="btn btn-secondary btn-sm" onclick="window._addServiceToDayInModal(${v})"><i class="fas fa-plus"></i> Thêm người</button>
                </div>
              </div>
              <div class="day-services-container" data-day="${v}" style="display: flex; flex-direction: column; gap: 0.5rem">
                ${(e.services||[]).filter(_=>_.date===(h.date||e.date)||!_.date&&v===0).map((_,b)=>{const y=Array.isArray(_.service)?_.service:[_.service],x=_.staff===window.state?.currentUser?.username;return`
                  <div class="day-service-row" data-sidx="${b}" style="display: flex; gap: 0.5rem; align-items: start; background: ${x?"#f8fafc":"#fff"}; border: 1px solid var(--border); padding: 0.5rem; border-radius: 8px">
                    <div style="flex: 1.5; min-width: 0; padding-right: 0.5rem; border-right: 1px dashed var(--border)">
                     <select class="form-control svc-role-input" multiple style="font-size: 0.8rem; padding: 0.2rem 0.4rem; height: 65px; overflow-y: auto;">
                       <option value="QUAY PS" ${y.includes("QUAY PS")?"selected":""}>QUAY PS</option>
                       <option value="CHỤP PS" ${y.includes("CHỤP PS")?"selected":""}>CHỤP PS</option>
                       <option value="QUAY TT" ${y.includes("QUAY TT")?"selected":""}>QUAY TT</option>
                       <option value="CHỤP TT" ${y.includes("CHỤP TT")?"selected":""}>CHỤP TT</option>
                       <option value="Quay Flycam" ${y.includes("Quay Flycam")?"selected":""}>Quay Flycam</option>
                       <option value="Edit" ${y.includes("Edit")?"selected":""}>Edit</option>
                       <option value="Khác" ${y.includes("Khác")?"selected":""}>Khác</option>
                     </select>
                   </div>
                    <div style="flex: 1.5">
                      <select class="form-control svc-staff-input" data-date="${h.date||e.date}" data-job-id="${e.id||""}" onchange="window._checkConflictUI(this)" style="font-size: 0.85rem; padding: 0.3rem 0.5rem; font-weight: 800; color: var(--text-main)">
                        <option value="">Chọn Thợ</option>
                         ${(window.state?.staff||[]).map(T=>`<option value="${T.name}" ${_.staff===T.name?"selected":""}>${T.name}</option>`).join("")}
                      </select>
                      <div class="conflict-warning" style="display:none; color: #ef4444; font-size: 0.7rem; margin-top: 0.2rem; font-weight: 700;"></div>
                    </div>
                     ${window.state?.currentUser?.role!=="admin"?"":`
                     <div style="position: relative">
                        <span style="position: absolute; left: 0.4rem; top: 50%; transform: translateY(-50%); font-size: 0.7rem; color: var(--text-dim)">đ</span>
                        <input type="number" class="form-control svc-cost-input" value="${_.cost||0}" style="font-size: 0.85rem; padding: 0.3rem 0.5rem 0.3rem 1.2rem; color: var(--danger); font-weight: 700">
                     </div>
                     <div style="position: relative">
                        <span style="position: absolute; left: 0.4rem; top: 50%; transform: translateY(-50%); font-size: 0.7rem; color: var(--text-dim)">đ</span>
                        <input type="number" class="form-control svc-edit-input" value="${_.edit||0}" placeholder="Tiền Edit" style="font-size: 0.85rem; padding: 0.3rem 0.5rem 0.3rem 1.2rem; color: var(--warning)">
                     </div>
                     `}
                     <div style="width: 40px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 0.5rem">
                       <button class="btn" style="color: var(--danger); padding: 0.2rem; background: none; border: none" onclick="this.closest('.day-service-row').remove(); window.saveJobDetail(window.state.modal.data, false)" title="Xoá"><i class="fas fa-trash"></i></button>
                     </div>
                  </div>
                `}).join("")}
              </div>
            </div>

          </div>
        </div>`}).join("");return`
        <div class="day-tabs" id="event-day-tabs">
          ${f}
          <button type="button" class="day-tab-btn add-day-btn" onclick="window._addDayTab()">+ Thêm ngày</button>
        </div>
        <div id="event-day-contents">
          ${u}
        </div>
      `})()}
          </div>

          <!-- Row 5: Deliverables -->
          <div style="margin-top: 0.5rem">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem">
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim)">📦 Thành phẩm đầu ra</label>
              <div style="display: flex; gap: 0.4rem">
                <button type="button" class="btn btn-secondary btn-sm" onclick="window._addDeliverableInModal()"><i class="fas fa-plus"></i> Thêm thành phẩm</button>
              </div>
            </div>
            <div id="deliverables-container-edit" style="display: flex; flex-direction: column; gap: 0.5rem">
              ${(e.deliverables&&e.deliverables.length>0?e.deliverables:[]).map((c,f)=>`
                <div class="deliverable-row" data-didx="${f}" style="display: grid; grid-template-columns: 2fr 100px 100px 100px 40px; gap: 0.5rem; align-items: center; background: #fff; border: 1px solid var(--border); padding: 0.5rem 0.75rem; border-radius: 8px">
                   <input type="text" class="form-control del-name-input" value="${c.name}" placeholder="Tên sản phẩm (VD: Clip Truyền Thống)" style="font-size: 0.85rem; padding: 0.35rem 0.5rem; font-weight: 700">
                   <select class="form-control del-type-input" style="font-size: 0.85rem; padding: 0.35rem">
                     ${["Video","Photo","Khác"].map(u=>`<option value="${u}" ${c.type===u?"selected":""}>${u}</option>`).join("")}
                   </select>
                   <select class="form-control del-editor-input" style="font-size: 0.85rem; padding: 0.35rem">
                     <option value="">Chọn Editor</option>
                     ${(window.state?.staff||[]).map(u=>`<option value="${u.name}" ${(c.editor||c.editStaff)===u.name?"selected":""}>${u.name}</option>`).join("")}
                   </select>
                   <input type="number" class="form-control del-qty-input" value="${c.quantity||1}" min="1" placeholder="Số lượng" title="Số lượng" style="font-size: 0.85rem; padding: 0.35rem 0.5rem">
                   <button type="button" class="btn block" style="padding: 0.3rem; color: var(--danger); background: none; border: none" onclick="this.closest('.deliverable-row').remove()" title="Xóa"><i class="fas fa-trash"></i></button>
                </div>
              `).join("")}
              ${!e.deliverables||e.deliverables.length===0?'<div class="empty-state" style="padding: 1rem; font-size: 0.8rem">Chưa có thành phẩm nào được khai báo.</div>':""}
            </div>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.4rem; font-style: italic">
              * Đây là danh sách Video/Photo sẽ đồng bộ sang bảng Kanban "Edit Video / Photo".
            </div>
          </div>

          <!-- Row 6: Links -->
          <div style="margin-top: 0.5rem">
            <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.5rem">🔗 Quản lý Liên kết (Links) - Trả file cho Khách</label>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap">
              
              <!-- Hidden inputs to store actual values for saveJobDetail to read -->
              <input type="hidden" id="edit-job-link-customer" value="${e.linkCustomer||""}">
              <input type="hidden" id="edit-job-link-nas" value="${e.linkNAS||""}">
              <input type="hidden" id="edit-job-link-drive" value="${e.linkDrive||""}">

              <!-- Customer Link Button -->
              <div class="link-btn-wrapper" onclick="window._promptEditLink('customer', 'Link trả file khách')" 
                   style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.75rem; border-radius: 8px; font-size: 0.85rem; font-weight: 700; transition: 0.2s;
                   ${e.linkCustomer?"background: rgba(22,163,74,0.1); border: 1.5px solid rgba(22,163,74,0.4); color: var(--success);":"background: #fff; border: 1.5px dashed var(--border); color: var(--text-dim);"}">
                <i class="fas fa-link"></i>
                <span>${e.linkCustomer?"Đã có Link Khách":"+ Thêm Link Khách"}</span>
                ${e.linkCustomer?`<div class="link-actions" style="display:flex; gap: 0.25rem; margin-left: 0.5rem">
                  <span onclick="event.stopPropagation(); window.open('${e.linkCustomer}','_blank')" style="padding: 0.15rem 0.35rem; background: var(--success); color: #fff; border-radius: 4px" title="Mở link"><i class="fas fa-external-link-alt"></i></span>
                  <span onclick="event.stopPropagation(); navigator.clipboard.writeText('${e.linkCustomer}')" style="padding: 0.15rem 0.35rem; background: var(--bg-hover); color: var(--text-main); border-radius: 4px" title="Copy link"><i class="fas fa-copy"></i></span>
                </div>`:""}
              </div>

              <!-- NAS Link Button -->
              <div class="link-btn-wrapper" onclick="window._promptEditLink('nas', 'Đường dẫn thư mục NAS')"
                   style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.75rem; border-radius: 8px; font-size: 0.85rem; font-weight: 700; transition: 0.2s;
                   ${e.linkNAS?"background: rgba(37,99,235,0.08); border: 1.5px solid rgba(37,99,235,0.4); color: var(--accent-blue);":"background: #fff; border: 1.5px dashed var(--border); color: var(--text-dim);"}">
                <i class="fas fa-server"></i>
                <span>${e.linkNAS?"Đã liên kết NAS":"+ Gắn thư mục NAS"}</span>
                ${e.linkNAS?`<div class="link-actions" style="display:flex; gap: 0.25rem; margin-left: 0.5rem">
                  <span onclick="event.stopPropagation(); navigator.clipboard.writeText('${e.linkNAS}')" style="padding: 0.15rem 0.35rem; background: var(--bg-hover); color: var(--text-main); border-radius: 4px" title="Copy path"><i class="fas fa-copy"></i></span>
                </div>`:""}
              </div>

              <!-- Google Drive Button -->
              <div class="link-btn-wrapper" onclick="window._promptEditLink('drive', 'Link thư mục Google Drive')"
                   style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.75rem; border-radius: 8px; font-size: 0.85rem; font-weight: 700; transition: 0.2s;
                   ${e.linkDrive?"background: rgba(13,148,136,0.08); border: 1.5px solid rgba(13,148,136,0.4); color: var(--accent-teal);":"background: #fff; border: 1.5px dashed var(--border); color: var(--text-dim);"}">
                <i class="fab fa-google-drive"></i>
                <span>${e.linkDrive?"Đã có Link Drive":"+ Thêm Link Drive"}</span>
                ${e.linkDrive?`<div class="link-actions" style="display:flex; gap: 0.25rem; margin-left: 0.5rem">
                  <span onclick="event.stopPropagation(); window.open('${e.linkDrive}','_blank')" style="padding: 0.15rem 0.35rem; background: var(--accent-teal); color: #fff; border-radius: 4px" title="Mở Drive"><i class="fas fa-external-link-alt"></i></span>
                  <span onclick="event.stopPropagation(); navigator.clipboard.writeText('${e.linkDrive}')" style="padding: 0.15rem 0.35rem; background: var(--bg-hover); color: var(--text-main); border-radius: 4px" title="Copy link"><i class="fas fa-copy"></i></span>
                </div>`:""}
              </div>

            </div>
          </div>

        </div><!-- /left -->

        <!-- RIGHT COLUMN: sticky profit panel -->
        <div style="position: sticky; top: 0; display: flex; flex-direction: column; gap: 1rem">

          <!-- Profit card -->
          ${window.state?.currentUser?.role!=="admin"?"":`
          <div style="background: ${a>=0?"rgba(21,128,61,0.06)":"rgba(185,28,28,0.06)"}; border: 2px solid ${a>=0?"rgba(21,128,61,0.20)":"rgba(185,28,28,0.20)"}; border-radius: 14px; padding: 1.25rem">
            <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.5rem">💰 Ước tính lợi nhuận</div>
            <div style="font-size: 2.2rem; font-weight: 900; color: ${a>=0?"var(--success)":"var(--danger)"}; line-height: 1.1; margin-bottom: 1rem">
              ${D(a)}
            </div>
            ${[["Doanh thu",r,"var(--success)"],["Chi phí thợ",o,"var(--danger)"],["Chi phí edit",s,"var(--warning)"]].map(([c,f,u])=>`
              <div style="display: flex; justify-content: space-between; font-size: 0.88rem; padding: 0.3rem 0; border-bottom: 1px solid var(--border)">
                <span style="color: var(--text-dim)">${c}</span>
                <span style="font-weight: 700; color: ${u}">${D(f)}</span>
              </div>
            `).join("")}
          </div>

          <!-- Finance summary card -->
          <div style="background: #fff; border: 1.5px solid var(--border); border-radius: 12px; padding: 1rem">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem">
               <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim)">💳 Thanh toán</div>
               ${l>0?`<button type="button" class="btn btn-sm" onclick="window.markJobFullyPaid('${e.id}')" style="background: var(--success); color: white; padding: 0.2rem 0.5rem; font-size: 0.65rem; border: none; border-radius: 4px"><i class="fas fa-check-double"></i> Đã tất toán</button>`:'<span style="font-size: 0.65rem; color: var(--success); font-weight: 800"><i class="fas fa-check-circle"></i> Hoàn tất</span>'}
            </div>
            ${[["Giá gói",r,"var(--text-main)"],["Đã đặt cọc",e.deposit||0,"var(--success)"],["Còn lại",l,"var(--warning)"]].map(([c,f,u])=>`
              <div style="display: flex; justify-content: space-between; padding: 0.35rem 0; border-bottom: 1px solid var(--border); font-size: 0.88rem">
                <span style="color: var(--text-dim)">${c}</span>
                <span style="font-weight: 700; color: ${u}">${D(f)}</span>
              </div>
            `).join("")}
          </div>
          `}

          <!-- ✅ JOB CHECKLIST (#10) -->
          <div style="background: #fff; border: 1.5px solid var(--border); border-radius: 12px; padding: 1rem">
            <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.75rem">✅ Tiến trình hợp đồng</div>
            ${[{key:"contractSigned",label:"📄 Hợp đồng đã ký",color:"#2563eb"},{key:"depositReceived",label:"💰 Đã nhận cọc",color:"#16a34a"},{key:"albumDelivered",label:"🖼️ Đã giao album",color:"#9333ea"},{key:"fullyPaid",label:"✅ Đã tất toán",color:"#dc2626"}].map(c=>{const f=!!(e.checklist||{})[c.key];return`<label style="display:flex;align-items:center;gap:0.6rem;padding:0.45rem 0.5rem;cursor:pointer;border-radius:8px;transition:0.15s;${f?`background:${c.color}10`:""}" onmouseover="this.style.background='${c.color}08'" onmouseout="this.style.background='${f?c.color+"10":""}'">
                <input type="checkbox" ${f?"checked":""} onchange="window.toggleJobChecklist('${e.id}','${c.key}',this.checked)"
                  style="width:16px;height:16px;accent-color:${c.color};cursor:pointer;flex-shrink:0">
                <span style="font-size:0.85rem;font-weight:${f?"800":"600"};color:${f?c.color:"var(--text-dim)"};text-decoration:${f?"line-through":"none"};transition:0.2s">${c.label}</span>
              </label>`}).join("")}
          </div>

          <!-- 💬 ZALO TEMPLATES (#7) -->
          <div style="background: #fff; border: 1.5px solid rgba(0,132,255,0.25); border-radius: 12px; padding: 1rem">
            <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #0084ff; margin-bottom: 0.6rem">💬 Nhắn Zalo nhanh</div>
            <div style="display: flex; flex-direction: column; gap: 0.4rem">
              ${[{label:"📅 Nhắc ngày chụp",icon:"📅",tpl:`Chào anh/chị ${e.client}! 🌸
Haru Studio xin nhắc lịch ngày ${new Date(e.date).toLocaleDateString("vi-VN")} của mình ạ.
Vui lòng liên hệ nếu cần điều chỉnh. Cảm ơn anh/chị! 💕`},{label:"🖼️ Album đã sẵn sàng",icon:"🖼️",tpl:`Chào anh/chị ${e.client}! 🌸
Album ảnh cưới của mình đã hoàn thành và sẵn sàng xem tại:
${e.linkCustomer||"[Chèn link album]"}
Haru Studio rất mong nhận được feedback của anh/chị! 💕`},{label:"💰 Nhắc thanh toán",icon:"💰",tpl:`Chào anh/chị ${e.client}! 🌸
Haru Studio xin nhắc nhở phần thanh toán còn lại: ${D(Math.max(0,(e.package||0)-(e.deposit||0)))} ạ.
Anh/chị vui lòng liên hệ để sắp xếp. Cảm ơn! 💕`}].map(c=>`
                <button onclick="navigator.clipboard.writeText(\`${c.tpl.replace(/`/g,"\\`").replace(/\n/g,"\\n")}\`).then(()=>{ window.showToast && window.showToast('📋 Đã copy tin nhắn Zalo!'); })"
                  style="text-align:left;padding:0.45rem 0.65rem;border-radius:8px;font-size:0.8rem;font-weight:700;cursor:pointer;border:1px solid rgba(0,132,255,0.2);background:rgba(0,132,255,0.04);color:#0050b3;transition:0.15s"
                  onmouseover="this.style.background='rgba(0,132,255,0.1)'" onmouseout="this.style.background='rgba(0,132,255,0.04)'">
                  ${c.label}
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Action buttons -->
          <div style="display: flex; flex-direction: column; gap: 0.6rem">
            <button class="btn btn-primary" style="width: 100%; font-size: 1rem; padding: 0.85rem" onclick="window.saveJobDetail('${e.id}')">
              <i class="fas fa-save"></i> Lưu thay đổi
            </button>
            <button class="btn btn-secondary" style="width: 100%; font-size: 0.9rem" onclick="window.deleteJob('${e.id}')">
              <i class="fas fa-trash"></i> Xóa dự án
            </button>
          </div>
          
          ${e.lastModifiedBy?`
          <div style="font-size: 0.65rem; color: var(--text-dim); text-align: center; margin-top: 0.5rem">
            <i>Cập nhật lần cuối: ${e.lastModifiedBy} (${new Date(e.lastModifiedTime).toLocaleString("vi-VN")})</i>
          </div>`:""}


          <!-- Chat / Comments -->
          <div style="background: #fff; border: 1.5px solid var(--border); border-radius: 12px; display: flex; flex-direction: column; overflow: hidden; height: 320px">
            <div style="padding: 0.85rem 1rem; border-bottom: 1px solid var(--border); font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); background: rgba(0,0,0,0.02)">💬 Trao đổi nội bộ</div>
            
            <div id="job-chat-messages" style="flex: 1; padding: 1rem; overflow-y: auto; display: flex; flex-direction: column; gap: 0.85rem; background: #fafafa">
              ${!e.comments||e.comments.length===0?'<div style="font-size: 0.8rem; color: var(--text-dim); text-align: center; font-style: italic; margin: auto">Chưa có bình luận nào</div>':""}
              ${(e.comments||[]).map(c=>{const f=c.user===window.state?.currentUser?.username||c.user===window.state?.currentUser?.displayName;return`
                    <div style="display: flex; flex-direction: column; gap: 0.2rem; align-items: ${f?"flex-end":"flex-start"}">
                       <div style="font-size: 0.65rem; color: var(--text-dim); font-weight: 700; padding: 0 0.2rem">${c.user} <span style="font-weight: 400; opacity: 0.8">• ${new Date(c.time||Date.now()).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"})}</span></div>
                       <div style="background: ${f?"var(--primary)":"#e5e7eb"}; color: ${f?"#fff":"var(--text-main)"}; padding: 0.5rem 0.75rem; border-radius: 12px; font-size: 0.85rem; max-width: 90%; line-height: 1.4; word-wrap: break-word; border-bottom-${f?"right":"left"}-radius: 2px">${c.text}</div>
                    </div>
                 `}).join("")}
            </div>

            <div style="padding: 0.75rem; border-top: 1px solid var(--border); background: #fff; display: flex; gap: 0.5rem">
               <input type="text" id="job-chat-input" placeholder="Nhập tin nhắn..." 
                 onkeydown="if(event.key === 'Enter') window.addJobComment('${e.id}')"
                 style="flex: 1; padding: 0.5rem 0.75rem; border: 1px solid var(--border); border-radius: 20px; font-size: 0.85rem; background: var(--surface); color: var(--text-main); outline: none">
               <button type="button" onclick="window.addJobComment('${e.id}')" style="background: var(--primary); color: white; border: none; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0"><i class="fas fa-paper-plane" style="font-size: 0.8rem"></i></button>
            </div>
          </div>

        </div><!-- /right -->
      </div>
    </div>
  `,n}window._addServiceToDayInModal=t=>{const e=document.querySelector(`.day-services-container[data-day="${t}"]`);if(!e)return;const n=Date.now(),i=window.state?.currentUser?.role!=="admin",r=document.createElement("div");r.className="day-service-row",r.setAttribute("data-sidx",n),r.style.cssText="display: flex; gap: 0.5rem; align-items: start; background: #fff; border: 1px solid var(--border); padding: 0.5rem; border-radius: 8px; margin-top: 0.5rem; animation: slideIn 0.2s ease",r.innerHTML=`
   <div style="flex: 1.5; min-width: 0; padding-right: 0.5rem; border-right: 1px dashed var(--border)">
     <select class="form-control svc-role-input" multiple style="font-size: 0.8rem; padding: 0.2rem 0.4rem; height: 65px; overflow-y: auto;">
       <option value="QUAY PS">QUAY PS</option>
       <option value="CHỤP PS">CHỤP PS</option>
       <option value="QUAY TT">QUAY TT</option>
       <option value="CHỤP TT">CHỤP TT</option>
       <option value="Quay Flycam">Quay Flycam</option>
       <option value="Edit">Edit</option>
       <option value="Khác">Khác</option>
     </select>
   </div>
   <div style="flex: 1.5">
     <select class="form-control svc-staff-input" style="font-size: 0.85rem; padding: 0.3rem 0.5rem; font-weight: 800; color: var(--text-main)">
       <option value="">Chọn Thợ</option>
       ${(window.state?.staff||[]).map(o=>`<option value="${o.name}">${o.name}</option>`).join("")}
     </select>
     <div class="conflict-warning" style="display:none; color: #ef4444; font-size: 0.7rem; margin-top: 0.2rem; font-weight: 700;"></div>
   </div>
     ${i?"":`
     <div style="position: relative">
        <span style="position: absolute; left: 0.4rem; top: 50%; transform: translateY(-50%); font-size: 0.7rem; color: var(--text-dim)">đ</span>
        <input type="number" class="form-control svc-cost-input" value="0" style="font-size: 0.85rem; padding: 0.3rem 0.5rem 0.3rem 1.2rem; color: var(--danger); font-weight: 700">
     </div>
     <div style="position: relative">
        <span style="position: absolute; left: 0.4rem; top: 50%; transform: translateY(-50%); font-size: 0.7rem; color: var(--text-dim)">đ</span>
        <input type="number" class="form-control svc-edit-input" value="0" placeholder="Tiền Edit" style="font-size: 0.85rem; padding: 0.3rem 0.5rem 0.3rem 1.2rem; color: var(--warning)">
     </div>
     `}
     <div style="width: 40px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 0.5rem">
       <button class="btn" style="color: var(--danger); padding: 0.2rem; background: none; border: none" onclick="this.closest('.day-service-row').remove(); window.saveJobDetail(window.state.modal.data, false)" title="Xoá"><i class="fas fa-trash"></i></button>
     </div>
  `,e.appendChild(r),window.saveJobDetail(window.state.modal.data,!1)};window._addDeliverableInModal=()=>{const t=document.getElementById("deliverables-container-edit");if(!t)return;const e=Date.now(),n=t.querySelector(".empty-state");n&&n.remove();const i=document.createElement("div");i.className="deliverable-row",i.setAttribute("data-didx",e),i.style.cssText="display: grid; grid-template-columns: 2fr 100px 100px 100px 40px; gap: 0.5rem; align-items: center; background: #fff; border: 1px solid var(--border); padding: 0.5rem 0.75rem; border-radius: 8px; margin-top: 0.5rem; animation: slideIn 0.2s ease",i.innerHTML=`
     <input type="text" class="form-control del-name-input" value="" placeholder="Tên sản phẩm (VD: Clip Truyền Thống)" style="font-size: 0.85rem; padding: 0.35rem 0.5rem; font-weight: 700">
     <select class="form-control del-type-input" style="font-size: 0.85rem; padding: 0.35rem">
       <option value="Video">Video</option><option value="Photo">Photo</option><option value="Khác">Khác</option>
     </select>
     <select class="form-control del-editor-input" style="font-size: 0.85rem; padding: 0.35rem">
       <option value="">Chọn Editor</option>
       ${(window.state?.staff||[]).map(r=>`<option value="${r.name}">${r.name}</option>`).join("")}
     </select>
     <input type="number" class="form-control del-qty-input" value="1" min="1" placeholder="Số lượng" title="Số lượng" style="font-size: 0.85rem; padding: 0.35rem 0.5rem">
     <button type="button" class="btn block" style="padding: 0.3rem; color: var(--danger); background: none; border: none" onclick="this.closest('.deliverable-row').remove(); window.saveJobDetail(window.state.modal.data, false)" title="Xóa"><i class="fas fa-trash"></i></button>
  `,t.appendChild(i),window.saveJobDetail(window.state.modal.data,!1)};function Ka(t){const e=document.createElement("div");e.innerHTML=`
    <div class="modal-header">
      <h2>Thêm Dự án (chuẩn Haru)</h2>
      <button class="close-btn" onclick="window.closeModal()">&times;</button>
    </div>
    <div class="modal-body">
      <div id="form-validation-errors" style="display:none; background: #fef2f2; border: 1px solid #f87171; border-radius:8px; padding:0.75rem 1rem; margin-bottom:1rem; color:#b91c1c; font-size:0.85rem"></div>
      <form id="add-job-form">
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1rem">
          <div class="form-group">
            <label>SHĐ - TIME</label>
            <input type="text" class="form-control" name="jobId" placeholder="VD: 87 - T11" required>
          </div>
          <div class="form-group">
            <label>Ngày tổ chức</label>
            <input type="date" class="form-control" name="date" required>
          </div>
          <div class="form-group">
            <label>CD - CR</label>
            <input type="text" class="form-control" name="client" placeholder="Tên khách hàng" required>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1rem">
          <div class="form-group">
            <label>Số điện thoại</label>
            <input type="text" class="form-control" name="phone" placeholder="SĐT liên hệ">
          </div>
          <div class="form-group">
            <label>Loại hình</label>
            <select class="form-control" name="eventType">
              <option>Wedding</option>
              <option>Pre-wedding</option>
              <option>Thôi nôi</option>
              <option>Lễ dạm ngõ</option>
              <option>Lễ gia tiên</option>
              <option>Tiệc tối</option>
              <option>Sự kiện khác</option>
            </select>
          </div>
          <div class="form-group">
            <label>Nhà hàng / Venue</label>
            <input type="text" class="form-control" name="venue" placeholder="Tên nhà hàng">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem">
          <div class="form-group">
            <label>Địa chỉ nhà Trai</label>
            <input type="text" class="form-control" name="boy_house" placeholder="Địa chỉ nhà trai">
          </div>
          <div class="form-group">
            <label>Địa chỉ nhà Gái</label>
            <input type="text" class="form-control" name="girl_house" placeholder="Địa chỉ nhà gái">
          </div>
        </div>

         <div class="form-group" style="margin-bottom: 1.5rem">
           <label style="font-size: 0.75rem; font-weight: 700">Dịch vụ & Nhân sự</label>
           <div id="service-rows-container" style="display: flex; flex-direction: column; gap: 0.5rem">
              <div class="service-entry-row" style="display: grid; grid-template-columns: 1.5fr 1fr 1fr 100px; gap: 0.5rem">
                 <select class="form-control" name="service_type[]">
                    ${(window.state?.settings?.serviceRoles||[]).map(s=>`<option>${s}</option>`).join("")}
                 </select>
                 <div style="display: flex; flex-direction: column;">
                   <select class="form-control" name="service_staff[]" onchange="window._checkConflictUI(this)">
                      <option value="">Chọn thợ...</option>
                      ${t.staff.map(s=>`<option value="${s.name}">${s.name}</option>`).join("")}
                   </select>
                   <div class="conflict-warning" style="display:none; color: #ef4444; font-size: 0.7rem; margin-top: 0.2rem; font-weight: 700;"></div>
                 </div>
                 <input type="number" class="form-control" name="service_cost[]" placeholder="Phí thợ">
                 <input type="number" class="form-control" name="service_edit[]" placeholder="Edit">
              </div>
           </div>
           <button type="button" id="add-service-row" class="btn btn-secondary btn-sm" style="margin-top: 0.5rem; font-size: 0.65rem">+ Thêm dòng</button>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem">
          <div class="form-group">
            <label>Giá trị gói (VNĐ)</label>
            <input type="number" inputmode="numeric" pattern="[0-9]*" class="form-control" name="package" required>
          </div>
          <div class="form-group">
            <label>Cọc 20% (VNĐ)</label>
            <input type="number" inputmode="numeric" pattern="[0-9]*" class="form-control" name="deposit">
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 1.5rem">
           <label style="font-weight: 700">Timeline & Giờ</label>
           <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem; margin-top: 0.5rem">
              <div class="glass-panel" style="padding: 0.75rem">
                 <label style="display: flex; align-items: center; gap: 0.3rem; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.4rem">
                    <input type="checkbox" name="timeline[]" value="le_sang"> Lễ sáng
                 </label>
                 <input type="time" class="form-control" name="le_time" value="05:00" style="font-size: 0.8rem; padding: 0.3rem">
              </div>
              <div class="glass-panel" style="padding: 0.75rem">
                 <label style="display: flex; align-items: center; gap: 0.3rem; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.4rem">
                    <input type="checkbox" name="timeline[]" value="tiec_trua"> Tiệc trưa
                 </label>
                 <input type="time" class="form-control" name="tiec_time_trua" value="11:00" style="font-size: 0.8rem; padding: 0.3rem">
              </div>
              <div class="glass-panel" style="padding: 0.75rem">
                 <label style="display: flex; align-items: center; gap: 0.3rem; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.4rem">
                    <input type="checkbox" name="timeline[]" value="tiec_toi"> Tiệc tối
                 </label>
                 <input type="time" class="form-control" name="tiec_time_toi" value="18:00" style="font-size: 0.8rem; padding: 0.3rem">
              </div>
           </div>
        </div>

        <div class="form-group" style="margin-bottom: 1rem">
           <label style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700">
              <input type="checkbox" id="two-day-toggle" onchange="document.getElementById('day2-section').style.display = this.checked ? 'block' : 'none'"> Tổ chức 2 ngày riêng biệt
           </label>
           <div id="day2-section" style="display: none; margin-top: 0.75rem; padding: 1rem; background: rgba(34,197,94,0.05); border: 1px solid rgba(34,197,94,0.15); border-radius: 10px">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem">
                 <div class="form-group">
                    <label>Ngày 2</label>
                    <input type="date" class="form-control" name="date2">
                 </div>
                 <div class="form-group">
                    <label>Địa điểm ngày 2</label>
                    <input type="text" class="form-control" name="venue2" placeholder="Nhà hàng ngày 2">
                 </div>
              </div>
              <label style="font-size: 0.8rem; font-weight: 700; margin-bottom: 0.3rem; display: block">Dịch vụ ngày 2</label>
              <div id="service-rows-day2" style="display: flex; flex-direction: column; gap: 0.5rem">
                 <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr 100px; gap: 0.5rem">
                    <select class="form-control" name="service_type_d2[]">
                       ${(window.state?.settings?.serviceRoles||[]).map(s=>`<option>${s}</option>`).join("")}
                    </select>
                    <div style="display: flex; flex-direction: column;">
                      <select class="form-control" name="service_staff_d2[]" onchange="window._checkConflictUI(this)">
                         <option value="">Chọn thợ...</option>
                         ${t.staff.map(s=>`<option value="${s.name}">${s.name}</option>`).join("")}
                      </select>
                      <div class="conflict-warning" style="display:none; color: #ef4444; font-size: 0.7rem; margin-top: 0.2rem; font-weight: 700;"></div>
                    </div>
                    <input type="number" class="form-control" name="service_cost_d2[]" placeholder="Phí thợ">
                    <input type="number" class="form-control" name="service_edit_d2[]" placeholder="Edit">
                 </div>
              </div>
              <button type="button" id="add-service-row-d2" class="btn btn-secondary btn-sm" style="margin-top: 0.5rem; font-size: 0.65rem">+ Thêm dòng ngày 2</button>
           </div>
        </div>

        <div class="modal-footer">
           <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Hủy bỏ</button>
           <button type="submit" class="btn btn-primary">Xác nhận tạo</button>
        </div>
      </form>
    </div>
  `;const n=e.querySelector("#add-service-row"),i=e.querySelector("#service-rows-container");n&&(n.onclick=()=>{const s=document.createElement("div");s.className="service-entry-row",s.style="display: grid; grid-template-columns: 1.5fr 1fr 1fr 100px; gap: 0.5rem; margin-top: 0.5rem",s.innerHTML=`
          <select class="form-control" name="service_type[]">
            ${(window.state?.settings?.serviceRoles||[]).map(a=>`<option>${a}</option>`).join("")}
          </select>
          <div style="display: flex; flex-direction: column;">
            <select class="form-control" name="service_staff[]" onchange="window._checkConflictUI(this)">
              <option value="">Chọn thợ...</option>
              ${t.staff.map(a=>`<option value="${a.name}">${a.name}</option>`).join("")}
            </select>
            <div class="conflict-warning" style="display:none; color: #ef4444; font-size: 0.7rem; margin-top: 0.2rem; font-weight: 700;"></div>
          </div>
          <input type="number" class="form-control" name="service_cost[]" placeholder="Phí thợ">
          <input type="number" class="form-control" name="service_edit[]" placeholder="Edit">
        `,i.appendChild(s)});const r=e.querySelector("#add-service-row-d2"),o=e.querySelector("#service-rows-day2");return r&&(r.onclick=()=>{const s=document.createElement("div");s.style="display: grid; grid-template-columns: 1.5fr 1fr 1fr 100px; gap: 0.5rem; margin-top: 0.5rem",s.innerHTML=`
          <select class="form-control" name="service_type_d2[]">
            ${(window.state?.settings?.serviceRoles||[]).map(a=>`<option>${a}</option>`).join("")}
          </select>
          <div style="display: flex; flex-direction: column;">
            <select class="form-control" name="service_staff_d2[]" onchange="window._checkConflictUI(this)">
              <option value="">Chọn thợ...</option>
              ${t.staff.map(a=>`<option value="${a.name}">${a.name}</option>`).join("")}
            </select>
            <div class="conflict-warning" style="display:none; color: #ef4444; font-size: 0.7rem; margin-top: 0.2rem; font-weight: 700;"></div>
          </div>
          <input type="number" class="form-control" name="service_cost_d2[]" placeholder="Phí thợ">
          <input type="number" class="form-control" name="service_edit_d2[]" placeholder="Edit">
        `,o.appendChild(s)}),e.querySelector("#add-job-form").onsubmit=s=>{s.preventDefault();const a=new FormData(s.target),l=a.getAll("service_type[]"),d=a.getAll("service_staff[]"),p=a.getAll("service_cost[]"),c=a.getAll("service_edit[]"),f=l.map((v,g)=>({service:v,staff:d[g],cost:parseInt(p[g])||0,paid:!1,edit:parseInt(c[g])||0,date:a.get("date")})).filter(v=>v.staff),u=a.getAll("timeline[]"),h={id:a.get("jobId")||Va(),jobNo:t.jobs.length+1,client:a.get("client"),date:a.get("date"),phone:a.get("phone")||"",eventType:a.get("eventType")||"Wedding",boyHouse:a.get("boy_house"),girlHouse:a.get("girl_house"),venue:a.get("venue")||a.get("boy_house")||a.get("girl_house"),package:parseInt(a.get("package")),deposit:parseInt(a.get("deposit"))||0,status:"Chưa gửi",isTrash:!1,visibility:!0,date2:a.get("date2")||"",venue2:a.get("venue2")||"",timeline:{le_sang:u.includes("le_sang"),tiec_trua:u.includes("tiec_trua"),tiec_toi:u.includes("tiec_toi"),le:a.get("le_time")||"05:00",tiec_trua_time:a.get("tiec_time_trua")||"11:00",tiec:a.get("tiec_time_toi")||"18:00"},services:f,linkCustomer:"",linkNAS:"",linkDrive:"",notes:""};window.addJob(h),window.closeModal()},e}function _o(t){const e=document.createElement("div");e.className="view-container reveal";const n=t.jobs.filter(i=>!i.isTrash);return e.innerHTML=`
    <h1 class="view-title">Kho Lưu Trữ Dự Án</h1>
    <p style="color: var(--text-dim); margin-bottom: 1rem;">Lọc theo tháng: ${t.currentMonth}/${t.currentYear}</p>
    <div class="job-grid">
      ${n.length>0?n.map(i=>Ii(i)).join(""):'<div class="empty-state">Không có dự án nào trong kỳ này</div>'}
    </div>
  `,e}function ko(t){const e=document.createElement("div");e.className="view-container reveal";const n=t._financeTab||"giao_dich",i=`
    <div style="display:flex;gap:0.3rem;margin-bottom:1.2rem;border-bottom:2px solid var(--border);padding-bottom:0">
      <button onclick="window.state._financeTab='giao_dich';window.updateUI()" style="padding:0.6rem 1.2rem;border:none;background:none;font-size:0.9rem;font-weight:800;cursor:pointer;font-family:inherit;border-bottom:3px solid ${n==="giao_dich"?"var(--primary)":"transparent"};color:${n==="giao_dich"?"var(--primary)":"var(--text-dim)"}">💰 Giao dịch</button>
      <button onclick="window.state._financeTab='thue';window.navigate('tax')" style="padding:0.6rem 1.2rem;border:none;background:none;font-size:0.9rem;font-weight:800;cursor:pointer;font-family:inherit;border-bottom:3px solid ${n==="thue"?"var(--primary)":"transparent"};color:${n==="thue"?"var(--primary)":"var(--text-dim)"}">🏛 Thuế</button>
    </div>`,r=[];return t.jobs.forEach(o=>{o.services.forEach(s=>{r.push({date:o.date,job:o.client,description:`Thanh toán: ${s.service} - ${s.staff} `,amount:-s.cost,status:s.paid?"Đã trả":"Đợi thanh toán",category:"Chi thợ"}),s.edit>0&&r.push({date:o.date,job:o.client,description:`Edit: ${s.service} `,amount:-s.edit,status:"Chốt tháng",category:"Chi Edit"})}),r.push({date:o.date,job:o.client,description:"Thu: Hợp đồng khách hàng",amount:o.package,status:"Đã cọc",category:"Thu thực tế"})}),t.manualTransactions&&t.manualTransactions.forEach(o=>{r.push({id:o.id,date:o.date,job:"—",description:o.description,amount:o.type==="chi"?-Math.abs(o.amount):Math.abs(o.amount),status:"—",category:o.category||(o.type==="chi"?"Chi khác":"Thu khác"),isManual:!0})}),r.sort((o,s)=>new Date(s.date)-new Date(o.date)),e.innerHTML=`
  ${i}
  <header class="section-header">
       <h1 class="view-title">💰 Tài chính — Giao dịch</h1>
       <div style="display: flex; gap: 0.5rem">
          <button class="btn btn-secondary btn-sm" onclick="window.navigate('year-report')"><i class="fas fa-chart-bar"></i> Báo cáo năm</button>
          <button class="btn btn-secondary btn-sm" onclick="window.exportCSV()"><i class="fas fa-file-export"></i> Xuất CSV</button>
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('txn-manual-form')?.scrollIntoView({behavior:'smooth'})"><i class="fas fa-plus"></i> Thêm chi phí lẻ</button>
       </div>
    </header>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.5rem">
       <div class="glass-panel" style="padding: 1.5rem; border-left: 4px solid var(--success)">
          <label style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 800">Tổng THU</label>
          <div style="font-size: 1.5rem; font-weight: 900; color: var(--success); margin-top: 0.5rem">
             +${D(r.filter(o=>o.amount>0).reduce((o,s)=>o+s.amount,0))}
          </div>
       </div>
       <div class="glass-panel" style="padding: 1.5rem; border-left: 4px solid var(--danger)">
          <label style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 800">Tổng CHI</label>
          <div style="font-size: 1.5rem; font-weight: 900; color: var(--danger); margin-top: 0.5rem">
             ${D(r.filter(o=>o.amount<0).reduce((o,s)=>o+s.amount,0))}
          </div>
       </div>
    </div>

    <div class="glass-panel" style="margin-top: 2rem">
       <table class="data-table">
          <thead>
             <tr>
                <th>Ngày</th>
                <th>Dự án</th>
                <th>Nội dung</th>
                <th>Phân loại</th>
                <th style="text-align: right">Số tiền</th>
                <th>Trạng thái</th>
             </tr>
          </thead>
          <tbody>
             ${r.map(o=>`
                <tr>
                   <td data-label="Ngày" style="font-size: 0.75rem; color: var(--text-dim)">${new Date(o.date).toLocaleDateString("vi-VN")}</td>
                   <td data-label="Dự án" style="font-weight: 700; font-size: 0.92rem">${o.job}</td>
                   <td data-label="Nội dung" style="font-size: 0.8rem">${o.description}</td>
                   <td data-label="Phân loại"><span class="badge" style="font-size: 0.82rem; background: ${o.category.startsWith("Thu")?"rgba(16,185,129,0.1)":"rgba(239,68,68,0.1)"}">${o.category}</span></td>
                   <td data-label="Số tiền" style="text-align: right; font-weight: 700; color: ${o.amount>=0?"var(--success)":"var(--danger)"}">
      ${o.amount>=0?"+":""}${D(o.amount)}
                   <td data-label="Trạng thái">
                     <span style="font-size: 0.7rem; color: var(--text-dim)">${o.status}</span>
                     ${o.isManual?`<button onclick="window.deleteTransaction(${o.id})" style="margin-left:8px;cursor:pointer;background:none;border:none;color:var(--danger);font-size:0.8rem" title="Xóa giao dịch"><i class="fas fa-trash"></i></button>`:""}
                   </td>
                </tr>
             `).join("")}
          </tbody>
       </table>
    </div>

    <div id="txn-manual-form" class="glass-panel" style="margin-top: 1.5rem; padding: 1.5rem">
       <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 1rem; color: var(--accent-orange)"><i class="fas fa-plus-circle" style="margin-right: 0.5rem"></i>Nhập giao dịch thủ công</h3>
       <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: flex-end">
          <div style="flex: 0.6">
             <label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.25rem">Ngày</label>
             <input type="date" id="txn-date" class="form-control" value="${new Date().toISOString().split("T")[0]}" style="font-size: 0.85rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border)">
          </div>
          <div style="flex: 1.5">
             <label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.25rem">Nội dung</label>
             <input type="text" id="txn-desc" class="form-control" placeholder="Mô tả giao dịch…" style="font-size: 0.85rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border)">
          </div>
          <div style="flex: 0.7">
             <label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.25rem">Số tiền</label>
             <input type="number" id="txn-amount" class="form-control" placeholder="0" style="font-size: 0.85rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border)">
          </div>
          <div style="flex: 0.5">
             <label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.25rem">Loại</label>
             <select id="txn-type" class="form-control" style="font-size: 0.85rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border)">
                <option value="chi">Chi</option>
                <option value="thu">Thu</option>
             </select>
          </div>
          <button class="btn btn-primary btn-sm" onclick="window.addTransaction({date:document.getElementById('txn-date').value,description:document.getElementById('txn-desc').value,amount:parseInt(document.getElementById('txn-amount').value)||0,type:document.getElementById('txn-type').value})"><i class="fas fa-plus"></i> Thêm</button>
       </div>
    </div>
`,e}function To(t){const e=document.createElement("div");e.className="view-container reveal";const n=t.jobs.filter(_=>!_.isTrash),i=n.reduce((_,b)=>_+(b.package||0),0),r=n.reduce((_,b)=>_+b.services.reduce((y,x)=>y+(x.cost||0),0),0),o=n.reduce((_,b)=>_+b.services.reduce((y,x)=>y+(x.edit||0),0),0),s=Math.round(i*.05),a=r+o+s,l=i-a,d=t.settings?.taxRate??.1,p=Math.round(i*d),c=Math.round(d*100),f=l-p,u=i>0?(l/i*100).toFixed(1):0,h=`
    <div style="display:flex;gap:0.3rem;margin-bottom:1.2rem;border-bottom:2px solid var(--border);padding-bottom:0">
      <button onclick="window.state._financeTab='giao_dich';window.navigate('finance')" style="padding:0.6rem 1.2rem;border:none;background:none;font-size:0.9rem;font-weight:800;cursor:pointer;font-family:inherit;border-bottom:3px solid transparent;color:var(--text-dim)">💰 Giao dịch</button>
      <button style="padding:0.6rem 1.2rem;border:none;background:none;font-size:0.9rem;font-weight:800;cursor:pointer;font-family:inherit;border-bottom:3px solid var(--primary);color:var(--primary)">🏛 Thuế</button>
    </div>`;e.innerHTML=`
  ${h}
  <h1 class="view-title" >💰 Tài chính — Thuế & Lợi nhuận</h1>
    <div style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 2rem">Tháng ${t.currentMonth}/${t.currentYear} • ${n.length} dự án</div>

    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin-bottom: 2.5rem">
       <div class="glass-panel" style="padding: 1.25rem; border-top: 3px solid var(--success)">
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem">Doanh thu</div>
          <div style="font-size: 1.3rem; font-weight: 900; color: var(--success)">${D(i)}</div>
       </div>
       <div class="glass-panel" style="padding: 1.25rem; border-top: 3px solid var(--accent-pink)">
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem">Chi phí thợ</div>
          <div style="font-size: 1.3rem; font-weight: 900; color: var(--accent-pink)">-${D(r)}</div>
       </div>
       <div class="glass-panel" style="padding: 1.25rem; border-top: 3px solid var(--accent-orange)">
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem">Chi phí Edit</div>
          <div style="font-size: 1.3rem; font-weight: 900; color: var(--accent-orange)">-${D(o)}</div>
       </div>
       <div class="glass-panel" style="padding: 1.25rem; border-top: 3px solid var(--warning)">
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem">Thuế ${c}%</div>
          <div style="font-size: 1.3rem; font-weight: 900; color: var(--warning)">-${D(p)}</div>
       </div>
       <div class="glass-panel" style="padding: 1.25rem; border-top: 3px solid ${f>=0?"#22c55e":"#f87171"}">
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem">Lợi nhuận ròng</div>
          <div style="font-size: 1.3rem; font-weight: 900; color: ${f>=0?"#22c55e":"#f87171"}">${D(f)}</div>
          <div style="font-size: 0.7rem; color: var(--text-dim); margin-top: 0.3rem">Margin: ${u}%</div>
       </div>
    </div>

    <div class="glass-panel" style="padding: 1.5rem">
       <h3 style="margin-bottom: 1.5rem; font-size: 1rem; font-weight: 800">Chi tiết theo Job</h3>
       <table class="data-table">
          <thead>
             <tr><th>Job</th><th>Khách hàng</th><th style="text-align:right">Doanh thu</th><th style="text-align:right">Chi thợ</th><th style="text-align:right">Chi edit</th><th style="text-align:right">Lợi nhuận</th></tr>
          </thead>
          <tbody>
             ${n.map(_=>{const b=_.package||0,y=_.services.reduce(($,I)=>$+(I.cost||0),0),x=_.services.reduce(($,I)=>$+(I.edit||0),0),T=b-y-x;return`<tr>
                  <td data-label="Job" style="font-weight: 700; font-size: 0.85rem">${_.id}</td>
                  <td data-label="Khách hàng" style="font-size: 0.85rem">${_.client}</td>
                  <td data-label="Doanh thu" style="text-align: right; color: var(--success); font-weight: 700">${D(b)}</td>
                  <td data-label="Chi thợ" style="text-align: right; color: var(--danger); font-weight: 700">${D(y)}</td>
                  <td data-label="Chi edit" style="text-align: right; color: var(--warning); font-weight: 700">${D(x)}</td>
                  <td data-label="Lợi nhuận" style="text-align: right; font-weight: 800; color: ${T>=0?"#22c55e":"#f87171"}">${D(T)}</td>
               </tr>`}).join("")}
             <tr style="border-top: 2px solid var(--border); font-weight: 900">
                <td colspan="2">TỔNG CỘNG</td>
                <td style="text-align: right; color: var(--success)">${D(i)}</td>
                <td style="text-align: right; color: var(--accent-pink)">${D(r)}</td>
                <td style="text-align: right; color: var(--accent-orange)">${D(o)}</td>
                <td style="text-align: right; color: ${l>=0?"#22c55e":"#f87171"}">${D(l)}</td>
             </tr>
          </tbody>
       </table>
    </div>
`;const v=document.createElement("div");v.className="glass-panel",v.style.cssText="padding:1rem;margin-top:1rem;display:flex;gap:1rem;align-items:center;flex-wrap:wrap";const g=t.settings?.taxRate??.1;return v.innerHTML=`
    <span style="font-size:0.85rem;font-weight:700">⚙️ Thuế suất:</span>
    <input type="number" id="tax-rate-input" value="${(g*100).toFixed(1)}"
      min="0" max="100" step="0.5"
      style="width:80px;border:1px solid var(--border);border-radius:6px;padding:0.3rem 0.5rem;font-size:0.9rem;font-weight:700;background:rgba(255,255,255,0.05);color:var(--text-main)">
    <span style="font-size:0.85rem;color:var(--text-dim)">%</span>
    <button class="btn btn-primary btn-sm" onclick="window.updateTaxRate(document.getElementById('tax-rate-input').value/100)">Cập nhật</button>
    <span style="font-size:0.75rem;color:var(--text-dim)">(Mặc định 10% — thay đổi sẽ ảnh hưởng toàn bộ tính toán thuế)</span>
  `,e.appendChild(v),e}function Co(t){const e=document.createElement("div");e.className="view-container reveal";const n=new Date;n.setHours(0,0,0,0);const i=t.jobs.filter(o=>{if(o.isTrash)return!1;const s=new Date(o.date);s.setHours(0,0,0,0);const a=Math.ceil((s.getTime()-n.getTime())/(1e3*60*60*24));return a>=0&&a<=30});i.sort((o,s)=>new Date(o.date)-new Date(s.date));const r=o=>o<=2?{color:"#f87171",bg:"rgba(248,113,113,0.12)",border:"#f87171",label:"🔴 KHẨN CẤP",pulse:"animation: pulse 1.5s infinite"}:o<=7?{color:"#fbbf24",bg:"rgba(251,191,36,0.08)",border:"#fbbf24",label:"🟡 SẮP TỚI",pulse:""}:o<=14?{color:"#60a5fa",bg:"rgba(96,165,250,0.08)",border:"#60a5fa",label:"🟢 ỔN ĐỊNH",pulse:""}:{color:"#9090b0",bg:"rgba(144,144,176,0.05)",border:"#9090b0",label:"⚪ BÌNH THƯỜNG",pulse:""};return e.innerHTML=`
  <style> @keyframes pulse { 0 %, 100 % { opacity: 1; } 50 % { opacity: 0.6; } }</style>
    <header class="section-header">
       <h1 class="view-title">📅 Lịch Nhắc Việc</h1>
       <div style="display: flex; align-items: center; gap: 1rem">
          <span style="font-size: 0.85rem; color: var(--text-dim)">30 ngày tới • ${i.length} việc</span>
       </div>
    </header>

    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 1rem; margin: 1.5rem 0">
       <div class="glass-panel" style="padding: 1rem; text-align: center; border-top: 3px solid #f87171">
          <div style="font-size: 1.8rem; font-weight: 900; color: #f87171">${i.filter(o=>Math.ceil((new Date(o.date)-n)/864e5)<=2).length}</div>
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Khẩn cấp</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; text-align: center; border-top: 3px solid #fbbf24">
          <div style="font-size: 1.8rem; font-weight: 900; color: #fbbf24">${i.filter(o=>{const s=Math.ceil((new Date(o.date)-n)/864e5);return s>2&&s<=7}).length}</div>
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Sắp tới</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; text-align: center; border-top: 3px solid #60a5fa">
          <div style="font-size: 1.8rem; font-weight: 900; color: #60a5fa">${i.filter(o=>{const s=Math.ceil((new Date(o.date)-n)/864e5);return s>7&&s<=14}).length}</div>
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Ổn định</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; text-align: center; border-top: 3px solid #9090b0">
          <div style="font-size: 1.8rem; font-weight: 900; color: #9090b0">${i.filter(o=>Math.ceil((new Date(o.date)-n)/864e5)>14).length}</div>
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Bình thường</div>
       </div>
    </div>

    <div class="reminder-list" style="margin-top: 1rem; display: flex; flex-direction: column; gap: 1rem">
      ${i.length>0?i.map((o,s)=>{const a=new Date(o.date),l=Math.ceil((a-n)/(1e3*60*60*24)),d=r(l),p=o.services.map(f=>f.staff).join(", "),c=l===0;return`
          <div ${c?'id="calendar-today-item"':""} class="glass-panel" style="padding: 1.25rem 1.5rem; border-left: 4px solid ${d.border}; background: ${c?"rgba(59,130,246,0.08)":d.bg}; position: relative; ${d.pulse}${c?";box-shadow:0 0 0 2px #3b82f6,0 4px 16px rgba(59,130,246,0.15)":""}">
             ${c?'<div style="position:absolute;top:0.5rem;right:0.75rem;font-size:0.62rem;font-weight:900;color:#3b82f6;background:rgba(59,130,246,0.12);padding:0.15rem 0.5rem;border-radius:20px;letter-spacing:0.5px">📍 HÔM NAY</div>':""}
             <div style="display: flex; justify-content: space-between; align-items: flex-start">
                <div style="flex: 1">
                   <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem">
                      <span style="font-size: 0.65rem; padding: 0.2rem 0.5rem; border-radius: 20px; background: ${d.bg}; border: 1px solid ${d.border}; font-weight: 700">${d.label}</span>
                      <span style="font-size: 0.75rem; color: var(--text-dim)">${o.id}</span>
                   </div>
                   <h3 style="font-size: 1.1rem; font-weight: 800; margin: 0 0 0.5rem 0">${o.client}</h3>
                   <div style="display: flex; gap: 2rem; font-size: 0.85rem; color: var(--text-muted)">
                      <span><i class="fas fa-calendar" style="margin-right: 0.3rem; color: ${d.color}"></i>${a.toLocaleDateString("vi-VN")}</span>
                      <span><i class="fas fa-users" style="margin-right: 0.3rem"></i>${p||"—"}</span>
                      <span><i class="fas fa-clock" style="margin-right: 0.3rem"></i>${o.timeline?.le||"—"}</span>
                   </div>
                   ${o.venue?`<div style="font-size: 0.8rem; color: var(--text-dim); margin-top: 0.4rem"><i class="fas fa-map-marker-alt" style="margin-right: 0.3rem"></i>${o.venue}</div>`:""}
                </div>
                <div style="text-align: center; min-width: 70px">
                   <div style="font-size: 2rem; font-weight: 900; color: ${c?"#3b82f6":d.color}; line-height: 1">${l}</div>
                   <div style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">${c?"Hôm nay":"ngày"}</div>
                </div>
             </div>
          </div>
        `}).join(""):'<div class="empty-state" style="padding: 3rem; text-align: center; color: var(--text-dim)">&#127881; Không có việc nào trong 30 ngày tới</div>'}
    </div>
`,setTimeout(()=>{const o=e.querySelector("#calendar-today-item");o&&o.scrollIntoView({behavior:"smooth",block:"center"})},150),e}function So(t){const e=document.createElement("div");e.className="view-container reveal";const n=t.jobs.filter(i=>i.isTrash);return e.innerHTML=`
  <h1 class="view-title" > Thùng Rác</h1>
    <div class="job-grid" style="margin-top: 1rem">
      ${n.length>0?n.map(i=>Ii(i)).join(""):'<div class="empty-state">Thùng rác trống</div>'}
    </div>
`,e}function $o(t){const e=document.createElement("div");e.className="view-container reveal";const n=[];t.jobs.forEach(o=>{if(o.isTrash)return;const s=go(o.date);o.services.forEach(a=>{const l=(Array.isArray(a.service)?a.service.join(" "):a.service||"").toLowerCase().includes("quay");n.push({job:o.client,id:o.id,service:a.service,staff:a.staff,editStaff:a.editStaff||"—",editCost:a.edit||0,deadline:l?s.video:s.photo,deadlineRaw:l?s.videoRaw:s.photoRaw,type:l?"VIDEO":"ẢNH",status:a.editStatus||(o.status==="Đã hoàn thành"?"Hoàn thành":"Chưa bắt đầu")})})});const i=t.deadlineFilter==="TẤT CẢ"?n:t.deadlineFilter==="ẢNH"?n.filter(o=>o.type==="ẢNH"):n.filter(o=>o.type==="VIDEO"),r=new Date;return e.innerHTML=`
  <header class="section-header" >
       <h1 class="view-title">Deadline EDIT Tracker</h1>
       <div class="month-tabs" style="background: none; border: 1px solid var(--border)">
          <div class="month-tab ${t.deadlineFilter==="TẤT CẢ"?"active":""}" onclick="window.setDeadlineFilter('TẤT CẢ')">TẤT CẢ</div>
          <div class="month-tab ${t.deadlineFilter==="ẢNH"?"active":""}" onclick="window.setDeadlineFilter('ẢNH')">EDIT ẢNH</div>
          <div class="month-tab ${t.deadlineFilter==="VIDEO"?"active":""}" onclick="window.setDeadlineFilter('VIDEO')">EDIT VIDEO</div>
       </div>
    </header>

  <div class="glass-panel" style="margin-top: 2rem">
    <table class="data-table">
      <thead>
        <tr>
          <th>JOB</th>
          <th>HẠNG MỤC</th>
          <th>DEADLINE</th>
          <th>TRẠNG THÁI</th>
          <th>NHÂN SỰ</th>
          <th>NHÂN SỰ EDIT</th>
          <th style="text-align: right">CHI PHÍ EDIT</th>
          <th>DỊCH VỤ</th>
        </tr>
      </thead>
      <tbody>
        ${i.length>0?i.map(o=>{const s=o.deadlineRaw&&o.deadlineRaw<r,a=o.status==="Hoàn thành"?"var(--success)":s?"var(--danger)":"#ff9800";return`
                <tr>
                   <td data-label="Job" style="font-weight: 800; font-size: 0.92rem">${o.job}</td>
                   <td data-label="Hạng mục"><span class="badge" style="background: ${o.type==="VIDEO"?"rgba(236,72,153,0.1)":"rgba(59,130,246,0.1)"}; color: ${o.type==="VIDEO"?"#ec4899":"#3b82f6"}">${o.type}</span></td>
                   <td data-label="Deadline" style="font-family: monospace; font-weight: 700; color: ${a}">
                      ${o.deadline}
                      ${s&&o.status!=="Hoàn thành"?'<span style="color: var(--danger); font-size: 0.55rem; display: block">MISSED</span>':""}
                   </td>
                   <td data-label="Trạng thái">
                      <select class="form-control deadline-status-select" data-job-id="${o.id}" data-service="${o.service}" style="padding: 0.25rem 0.6rem; font-size: 0.85rem; width: 140px; background:#fff; border:1.5px solid var(--border); color:var(--text-main)">
                         <option ${o.status==="Chưa bắt đầu"?"selected":""}>Chưa bắt đầu</option>
                         <option ${o.status==="Đang làm"?"selected":""}>Đang làm</option>
                         <option ${o.status==="Demo 1"?"selected":""}>Demo 1</option>
                         <option ${o.status==="Demo 2"?"selected":""}>Demo 2</option>
                         <option ${o.status==="Hoàn thành"?"selected":""}>Hoàn thành</option>
                      </select>
                   </td>
                   <td data-label="Nhân sự" style="font-size: 0.88rem; font-weight:600">${o.staff}</td>
                   <td data-label="Người Cắt" style="font-size: 0.88rem; color: var(--accent); font-weight:700">${o.editStaff}</td>
                   <td data-label="Phí Edit" style="text-align: right; font-size: 0.88rem; font-weight:700; color:var(--danger)">${D(o.editCost)}</td>
                   <td data-label="Dịch vụ" style="font-size: 0.85rem; color: var(--text-dim); font-weight:600">${o.service}</td>
                </tr>
              `}).join(""):'<tr><td colspan="8" style="text-align: center; padding: 2rem">Không có dữ liệu phù hợp</td></tr>'}
      </tbody>
    </table>
  </div>
`,e.addEventListener("change",function(o){var s=o.target;if(s.classList.contains("deadline-status-select")){var a=s.getAttribute("data-job-id"),l=s.getAttribute("data-service"),d=s.value;!a||!l||window.updateEditStatus(a,l,d)}}),e}function Eo(t){const e=document.createElement("div");e.className="view-container reveal";const n=new Date;n.setHours(0,0,0,0);const i=20,r=[];t.jobs.forEach(b=>{b.isTrash||(b.deliverables||[]).forEach((y,x)=>{if(!(y.type==="Video"))return;const $=new Date(b.date);$.setHours(0,0,0,0);const I=new Date($);I.setDate(I.getDate()+i);const B=I-n,P=Math.ceil(B/(1e3*60*60*24)),X=i-P,ie=Math.max(0,Math.min(100,X/i*100));let w,k,z,E;const O=y.editStatus||"Chưa bắt đầu";O==="Hoàn thành"?(w="HOÀN THÀNH",k="#22c55e",z="rgba(34,197,94,0.08)",E="✅"):P>10?(w="THOẢI MÁI",k="#22c55e",z="rgba(34,197,94,0.06)",E="🟢"):P>5?(w="CẦN ĐẨY",k="#eab308",z="rgba(234,179,8,0.06)",E="🟡"):P>0?(w="GẤP",k="#f97316",z="rgba(249,115,22,0.08)",E="🟠"):(w="QUÁ HẠN",k="#ef4444",z="rgba(239,68,68,0.08)",E="🔴"),r.push({jobId:b.id,jobNo:b.jobNo,client:b.client,service:y.name,serviceIdx:x,qty:y.quantity||1,editStaff:y.editor||"",editStatus:O,editDriveLink:y.editDriveLink||"",jobDate:b.date,deadlineDate:I,deadlineStr:I.toLocaleDateString("vi-VN"),daysLeft:P,progress:ie,stage:w,stageColor:k,stageBg:z,stageIcon:E})})});const o={"QUÁ HẠN":0,GẤP:1,"CẦN ĐẨY":2,"THOẢI MÁI":3,"HOÀN THÀNH":4};r.sort((b,y)=>(o[b.stage]??5)-(o[y.stage]??5)||b.daysLeft-y.daysLeft);const s=t.editVideoFilter||"TẤT CẢ",a=[...new Set(r.map(b=>b.editStaff).filter(Boolean))].sort();let l=s==="TẤT CẢ"?r:r.filter(b=>b.editStaff===s);const d=t.editVideoStatusFilter||"ALL";d==="DONE"?l=l.filter(b=>b.editStatus==="Hoàn thành"):d==="PENDING"?l=l.filter(b=>b.editStatus!=="Hoàn thành"):d==="PENDING_DEMO"&&(l=l.filter(b=>b.editStatus==="Chưa bắt đầu"||b.editStatus==="Đang cắt")),t.editVideoMissingLink&&(l=l.filter(b=>b.editStatus==="Hoàn thành"&&!b.editDriveLink));const p=(t.editVideoView||"list")==="kanban",c=[{key:"Chưa bắt đầu",label:"⏳ Chưa bắt đầu",color:"#94a3b8"},{key:"Đang cắt",label:"✂️ Đang cắt",color:"#3b82f6"},{key:"Demo 1",label:"🖥️ Demo",color:"#f59e0b"},{key:"Chỉnh sửa",label:"🔧 Chỉnh sửa",color:"#8b5cf6"},{key:"Hoàn thành",label:"✅ Hoàn thành",color:"#22c55e"}],f=r.length,u=r.filter(b=>b.editStatus==="Hoàn thành").length,h=r.filter(b=>["Đang cắt","Demo 1","Chỉnh sửa"].includes(b.editStatus)).length,v=r.filter(b=>b.stage==="QUÁ HẠN").length;t.staff.map(b=>`<option value="${b.name}">${b.name}</option>`).join("");const g=window.state?.currentUser?.role==="admin"||!window.state?.currentUser,_=(()=>{if(!g)return"";const b={};r.filter(x=>x.editStatus==="Hoàn thành"&&x.editStaff).forEach(x=>{b[x.editStaff]||(b[x.editStaff]={clips:0}),b[x.editStaff].clips++});const y=Object.entries(b);return y.length===0?"":`<div class="glass-panel" style="padding:0.65rem 1rem;margin-bottom:1rem;border-left:3px solid #a855f7;background:rgba(168,85,247,0.04)">
      <div style="font-size:0.68rem;font-weight:800;color:#a855f7;text-transform:uppercase;margin-bottom:0.4rem">&#128176; KPI Hậu kỳ tháng này (clip ĐÃ xong)</div>
      <div style="display:flex;gap:0.6rem;flex-wrap:wrap">
        ${y.map(([x,T])=>`<div style="background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.2);border-radius:6px;padding:0.3rem 0.7rem">
          <div style="font-size:0.72rem;font-weight:800">${x}</div>
          <div style="font-size:0.6rem;color:var(--text-dim)">${T.clips} clip hoàn thành</div>
        </div>`).join("")}
      </div>
    </div>`})();return e.innerHTML=`
    <header class="section-header">
       <div>
         <h1 class="view-title">&#127916; Edit Video Tracker</h1>
         <p style="color: var(--text-dim); font-size: 0.85rem; margin-top: 0.2rem">Theo dõi tiến độ hậu kỳ video — Deadline ${i} ngày</p>
       </div>
    </header>
    ${_}

    <!-- Thống kê tổng quan -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem">
       <div class="glass-panel" style="padding: 1rem; border-top: 3px solid #3b82f6; text-align: center">
          <div style="font-size: 0.65rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Tổng Video</div>
          <div style="font-size: 1.8rem; font-weight: 900; color: #3b82f6; margin-top: 0.3rem">${f}</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; border-top: 3px solid #22c55e; text-align: center">
          <div style="font-size: 0.65rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Đã xong</div>
          <div style="font-size: 1.8rem; font-weight: 900; color: #22c55e; margin-top: 0.3rem">${u}</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; border-top: 3px solid #f97316; text-align: center">
          <div style="font-size: 0.65rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Đang làm</div>
          <div style="font-size: 1.8rem; font-weight: 900; color: #f97316; margin-top: 0.3rem">${h}</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; border-top: 3px solid #ef4444; text-align: center">
          <div style="font-size: 0.65rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Quá hạn</div>
          <div style="font-size: 1.8rem; font-weight: 900; color: #ef4444; margin-top: 0.3rem">${v}</div>
       </div>
    </div>

    <!-- Bộ lọc nhân sự edit -->
    <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.5rem">
       <button onclick="window.setEditVideoFilter('TẤT CẢ')" class="btn btn-sm" style="font-size: 0.78rem; padding: 0.25rem 0.7rem; border-radius: 20px; ${s==="TẤT CẢ"?"background: var(--primary); color: #fff; border: none":"background: #fff; color: var(--text-dim); border: 1px solid var(--border)"}">Tất cả (${f})</button>
       ${a.map(b=>`
         <button onclick="window.setEditVideoFilter('${b}')" class="btn btn-sm" style="font-size: 0.78rem; padding: 0.25rem 0.7rem; border-radius: 20px; ${s===b?"background: var(--primary); color: #fff; border: none":"background: #fff; color: var(--text-dim); border: 1px solid var(--border)"}">${b}</button>
       `).join("")}
    </div>
    <div style="display: flex; gap: 0.35rem; margin-bottom: 1.2rem; flex-wrap: wrap; align-items: center">
      <button onclick="window.setEditVideoStatusFilter('ALL')" style="font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 16px; cursor: pointer; font-weight: 700; font-family: inherit; ${d==="ALL"?"background:#3b82f6;color:#fff;border:none":"background:#fff;color:var(--text-dim);border:1px solid var(--border)"}">&#127916; Tất cả (${r.length})</button>
      <button onclick="window.setEditVideoStatusFilter('PENDING')" style="font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 16px; cursor: pointer; font-weight: 700; font-family: inherit; ${d==="PENDING"?"background:#f97316;color:#fff;border:none":"background:#fff;color:var(--text-dim);border:1px solid var(--border)"}">&#9888;&#65039; Chưa xong (${r.filter(b=>b.editStatus!=="Hoàn thành").length})</button>
      <button onclick="window.setEditVideoStatusFilter('PENDING_DEMO')" style="font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 16px; cursor: pointer; font-weight: 700; font-family: inherit; ${d==="PENDING_DEMO"?"background:#8b5cf6;color:#fff;border:none":"background:#fff;color:var(--text-dim);border:1px solid var(--border)"}">&#128640; Chưa gửi Demo (${r.filter(b=>b.editStatus==="Chưa bắt đầu"||b.editStatus==="Đang cắt").length})</button>
      <button onclick="window.setEditVideoStatusFilter('DONE')" style="font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 16px; cursor: pointer; font-weight: 700; font-family: inherit; ${d==="DONE"?"background:#22c55e;color:#fff;border:none":"background:#fff;color:var(--text-dim);border:1px solid var(--border)"}">&#9989; Hoàn thành (${u})</button>
      <!-- Phase 3 #6: Audit Link Filter -->
      <button onclick="window.setMissingLinkFilter('video', ${!t.editVideoMissingLink})" style="font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 16px; cursor: pointer; font-weight: 700; font-family: inherit; ${t.editVideoMissingLink?"background:#f59e0b;color:#fff;border:none":"background:#fff;color:var(--text-dim);border:1px solid var(--border)"}" title="Lọc những clip ĐÃ xong nhưng chưa nộp link">&#128279; Thiếu Link (${r.filter(b=>b.editStatus==="Hoàn thành"&&!b.editDriveLink).length})</button>
      <span style="margin-left:auto;display:flex;gap:0.3rem">
        <button onclick="window.toggleEditVideoView('kanban')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;${p?"background:var(--primary);color:#fff;border:none":"background:#fff;color:var(--text-dim);border:1px solid var(--border)"}">📋 Kanban</button>
        <button onclick="window.toggleEditVideoView('list')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;${p?"background:#fff;color:var(--text-dim);border:1px solid var(--border)":"background:var(--primary);color:#fff;border:none"}">📝 List</button>
      </span>
    </div>

    ${p?`<div style="display:grid;grid-template-columns:repeat(${c.length},1fr);gap:0.6rem;overflow-x:auto;min-height:300px">
      ${c.map(b=>{const y=l.filter(x=>x.editStatus===b.key);return`
        <div class="ev-col" data-status="${b.key}" style="background:var(--bg-deep);border:1px solid var(--border);border-radius:10px;padding:0.5rem;border-top:3px solid ${b.color}">
          <div style="font-size:0.72rem;font-weight:800;color:${b.color};margin-bottom:0.4rem;text-align:center">${b.label} (${y.length})</div>
          <div class="ev-col-cards" data-status="${b.key}" style="min-height:60px;display:flex;flex-direction:column;gap:0.4rem">
            ${y.map(x=>{const T=window.state?.locks?.[x.jobId];return`<div class="ev-card ${T?"locked-card":""}" onclick="${T?"":`window.openQuickPreview('${x.jobId}')`}" data-jobid="${x.jobId}" data-sidx="${x.serviceIdx}" style="${T?"opacity:0.6;pointer-events:none;":""} background:${x.editStatus!=="Hoàn thành"&&x.stage==="QUÁ HẠN"?"#fef2f2":x.editStatus!=="Hoàn thành"&&x.stage==="GẤP"?"#fff7ed":"var(--bg-main)"};border:1px solid ${x.stageColor}30;border-radius:6px;padding:0.4rem 0.5rem;border-left:3px solid ${x.stageColor};cursor:grab;box-shadow:0 1px 2px rgba(0,0,0,0.03);position:relative;">
              ${T?`<div style="position:absolute;top:-5px;right:-5px;background:#ef4444;color:#fff;font-size:0.5rem;padding:0.15rem 0.4rem;border-radius:10px;z-index:10;box-shadow:0 2px 4px rgba(0,0,0,0.2)">🔒 ${window.state.locks[x.jobId]}</div>`:""}
              <div style="font-size:0.75rem;font-weight:800;color:var(--text-main);margin-bottom:0.15rem;display:flex;justify-content:space-between;align-items:center">
                <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:130px" title="${x.client}">${x.client}</span>
                ${x.editStatus!=="Hoàn thành"&&x.daysLeft<=0?'<span title="Quá hạn" style="animation:pulse 2s infinite;font-size:0.65rem">🚨</span>':""}
              </div>
              <div style="font-size:0.6rem;color:var(--text-dim);margin-bottom:0.3rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${x.service}">🎬 ${x.service} <strong style="color:var(--text-main)">(x${x.qty})</strong></div>
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:0.55rem;font-weight:700;color:${x.editStatus==="Hoàn thành"?"#22c55e":x.daysLeft>0?"var(--text-dim)":"#ef4444"}">⏰ ${x.deadlineStr}</span>
                <span style="font-size:0.55rem;font-weight:700;background:#a855f715;color:#a855f7;padding:0.15rem 0.3rem;border-radius:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:70px" title="${x.editStaff||"Chưa gán"}">✏️ ${x.editStaff||"Trống"}</span>
              </div>
            </div>`}).join("")}
          </div>
        </div>`}).join("")}
    </div>`:`
    <div class="edit-video-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1.25rem">
       ${l.length>0?l.map(b=>{b.editStatus==="Hoàn thành"||b.stageColor,b.editStatus==="Hoàn thành"||b.progress;const y=["Chưa bắt đầu","Đang cắt","Demo 1","Chỉnh sửa","Hoàn thành"],x=y.indexOf(b.editStatus);return`
         <div class="edit-video-card" style="background: ${b.stageBg}; border: 1.5px solid ${b.stageColor}30; border-radius: 12px; padding: 0.75rem; transition: all 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.03)">
            <!-- Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem">
               <div style="display: flex; align-items: center; gap: 0.4rem">
                  <span style="font-size: 0.68rem; font-weight: 900; color: ${b.stageColor}; text-transform: uppercase; background: ${b.stageColor}15; padding: 0.1rem 0.4rem; border-radius: 4px">${b.stage}</span>
                  <span style="font-size: 0.7rem; font-weight: 700; color: var(--text-dim); background: rgba(0,0,0,0.04); padding: 0.1rem 0.4rem; border-radius: 4px">${b.service}</span>
                  <span style="font-size: 0.6rem; font-weight: 800; color: var(--primary); background: var(--accent-soft); padding: 0.1rem 0.4rem; border-radius: 4px">#${b.jobNo||"—"}</span>
               </div>
               <span style="font-size: 0.65rem; font-weight: 800; color: ${b.stageColor}; ${b.stage==="QUÁ HẠN"?"animation:pulse 2s infinite":""}">${b.editStatus==="Hoàn thành"?"✅":b.daysLeft>0?"⏳ "+b.daysLeft+"ng":"🚨 -"+Math.abs(b.daysLeft)+"ng"}</span>
            </div>

            <!-- Client -->
            <div style="font-size: 0.95rem; font-weight: 800; margin-bottom: 0.3rem; line-height: 1.2">${b.client}</div>

            <!-- Progress bar mini -->
            <div style="display: flex; gap: 0.15rem; margin-bottom: 0.5rem">
               ${y.map((T,$)=>{const I=$===x;return`<div style="flex: 1; height: 3px; background: ${$<x?"#22c55e":I?b.stageColor:"rgba(0,0,0,0.1)"}; border-radius: 2px" title="${T}"></div>`}).join("")}
            </div>

            <!-- Controls compact -->
            <div style="display: flex; flex-direction: column; gap: 0.35rem; background: rgba(255,255,255,0.5); padding: 0.5rem; border-radius: 8px; border: 1px solid var(--border)">
               <div style="display: flex; align-items: center; gap: 0.4rem">
                  <label style="font-size: 0.62rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; min-width: 55px">🎬 Editor</label>
                  <select class="form-control ev-editor-select" data-job-id="${b.jobId}" data-sidx="${b.serviceIdx}"
                     style="flex: 1; font-size: 0.8rem; padding: 0.25rem 0.4rem; background: #fff; border: 1px solid var(--border); font-weight: 700">
                     <option value="">— Chưa chọn —</option>
                     ${t.staff.map(T=>`<option value="${T.name}" ${b.editStaff===T.name?"selected":""}>${T.name}</option>`).join("")}
                  </select>
               </div>
               <div style="display: flex; align-items: center; gap: 0.4rem">
                  <label style="font-size: 0.62rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; min-width: 55px">📊 T.Thái</label>
                  <select class="form-control ev-status-select" data-job-id="${b.jobId}" data-sidx="${b.serviceIdx}"
                     style="flex: 1; font-size: 0.8rem; padding: 0.25rem 0.4rem; background: #fff; border: 1px solid ${b.stageColor}40; color: ${b.stageColor}; font-weight: 800">
                     ${y.map(T=>`<option value="${T}" ${b.editStatus===T?"selected":""}>${T}</option>`).join("")}
                  </select>
               </div>
               <div style="display: flex; align-items: center; gap: 0.4rem">
                  <label style="font-size: 0.62rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; min-width: 55px">🔗 Drive</label>
                  <input type="text" class="form-control ev-drive-input" data-job-id="${b.jobId}" data-sidx="${b.serviceIdx}"
                     placeholder="Link sản phẩm…" value="${b.editDriveLink}"
                     style="flex: 1; font-size: 0.78rem; padding: 0.25rem 0.4rem; background: #fff; border: 1px solid var(--border)">
                  ${b.editDriveLink?`<a href="${b.editDriveLink}" target="_blank" style="font-size: 0.65rem; color: #22c55e; font-weight: 700; white-space: nowrap; text-decoration: none">Mở ↗</a>`:""}
               </div>
            </div>
         </div>`}).join(""):`<div style="grid-column:1/-1;text-align:center;padding:2.5rem 1rem">
        <div class="empty-state-icon" style="font-size:3rem;margin-bottom:0.75rem">🎞️</div>
        <h3 style="font-size:1.05rem;font-weight:800;color:var(--text-main);margin-bottom:0.3rem">Không có video task nào</h3>
        <p style="font-size:0.8rem;color:var(--text-dim);max-width:300px;margin:0 auto">Thêm thành phẩm Video vào đơn hàng để theo dõi tiến độ edit tại đây.</p>
      </div>`}
    </div>`}
  `,e.addEventListener("change",function(b){const y=b.target;y.classList.contains("ev-editor-select")&&window.updateVideoEditor(y.dataset.jobId,y.dataset.sidx,y.value),y.classList.contains("ev-status-select")&&window.updateVideoEditStatus(y.dataset.jobId,y.dataset.sidx,y.value)}),e.addEventListener("blur",function(b){const y=b.target;y.classList.contains("ev-drive-input")&&window.updateVideoEditLink(y.dataset.jobId,y.dataset.sidx,y.value)},!0),e}function No(t){const e=document.createElement("div");e.className="view-container reveal";const n=t.jobs.filter(o=>!o.isTrash).length,i=t.staff.length,r=t.jobs.filter(o=>!o.isTrash).reduce((o,s)=>o+(s.package||0),0);return e.innerHTML=`
  <h1 class="view-title" >👑 Trung Tâm Quản Trị</h1>
    <div style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 2rem">Quản lý cấu hình, người dùng và dữ liệu hệ thống</div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem">
       <div class="glass-panel" style="padding: 1.5rem">
          <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 1.25rem; color: #22c55e"><i class="fas fa-chart-bar" style="margin-right: 0.5rem"></i>Báo cáo hệ thống</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem">
             <div style="padding: 0.75rem; background: rgba(0,0,0,0.1); border-radius: 8px">
                <div style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Phiên bản</div>
                <div style="font-size: 1rem; font-weight: 800">v3.1.1-Premium</div>
                <div style="font-size: 0.7rem; color: var(--text-dim); margin-top: 0.2rem">Cập nhật lúc: 13:13:20 11/3/2026</div>
             </div>
             <div style="padding: 0.75rem; background: rgba(0,0,0,0.1); border-radius: 8px">
                <div style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Tổng dự án</div>
                <div style="font-size: 1rem; font-weight: 800; color: var(--accent-blue)">${n}</div>
             </div>
             <div style="padding: 0.75rem; background: rgba(0,0,0,0.1); border-radius: 8px">
                <div style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Nhân sự</div>
                <div style="font-size: 1rem; font-weight: 800; color: var(--accent-pink)">${i}</div>
             </div>
             <div style="padding: 0.75rem; background: rgba(0,0,0,0.1); border-radius: 8px">
                <div style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Tổng doanh thu</div>
                <div style="font-size: 1rem; font-weight: 800; color: var(--success)">${D(r)}</div>
             </div>
          </div>
       </div>

       <div class="glass-panel" style="padding: 1.5rem">
          <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 1.25rem; color: var(--accent-teal)"><i class="fas fa-building" style="margin-right: 0.5rem"></i>Thông tin Studio</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem">
             <div><label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.2rem">Tên Studio</label><input id="setting-studio-name" class="form-control" value="${t.settings.studioName||"Haru Wedding Film"}" style="font-size: 0.9rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border)"></div>
             <div><label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.2rem">SĐT liên hệ</label><input id="setting-studio-phone" class="form-control" value="${t.settings.studioPhone||"0909 xxx xxx"}" style="font-size: 0.9rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border)"></div>
             <div><label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.2rem">Địa chỉ</label><input id="setting-studio-address" class="form-control" value="${t.settings.studioAddress||"TP. Hồ Chí Minh"}" style="font-size: 0.9rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border)"></div>
          </div>
          <button class="btn btn-primary btn-sm" style="margin-top: 1rem" onclick="window.saveStudioInfo()">💾 Lưu thông tin</button>
       </div>
    </div>

    ${t.currentUser?.role==="admin"?`
    <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2rem; border: 2px solid rgba(139,92,246,0.3)">
       <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 1rem; color: #8b5cf6"><i class="fas fa-bug" style="margin-right: 0.5rem"></i>🛠 Debug Tools (Admin)</h3>

       <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-bottom: 1rem">
          <button class="btn btn-sm" style="background: #22c55e; color: #fff; border: none; padding: 0.5rem; font-weight: 700; border-radius: 8px" onclick="window.runHealthCheck()">🔍 Health Check</button>
          <button class="btn btn-sm" style="background: #3b82f6; color: #fff; border: none; padding: 0.5rem; font-weight: 700; border-radius: 8px" onclick="window.showDebugLogs()">📊 Console Log</button>
          <button class="btn btn-sm" style="background: #f59e0b; color: #fff; border: none; padding: 0.5rem; font-weight: 700; border-radius: 8px" onclick="window.forceMigration()">🔄 Force Migration</button>
       </div>

       <div id="debug-health-result" style="margin-bottom: 0.75rem; max-height: 200px; overflow-y: auto; border-radius: 8px"></div>
       <div id="debug-console-result" style="max-height: 200px; overflow-y: auto; background: rgba(0,0,0,0.05); border-radius: 8px"></div>
    </div>

    <!-- STAFF MANAGEMENT PANEL -->
    <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2rem">
       <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 1.25rem; color: #3b82f6"><i class="fas fa-users" style="margin-right: 0.5rem"></i>Quản lý Nhân sự & CTV</h3>
       <button class="btn btn-primary btn-sm" onclick="document.getElementById('admin-add-staff-form').style.display='flex'"><i class="fas fa-plus"></i> Thêm nhân sự mới</button>
       
       <div id="admin-add-staff-form" style="display: none; gap: 0.75rem; margin: 1rem 0; padding: 1.25rem; background: rgba(59,130,246,0.06); border: 1px solid rgba(59,130,246,0.2); border-radius: 12px; flex-wrap: wrap; align-items: flex-end">
          <div style="flex: 1; min-width: 150px">
             <label style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 0.3rem">Tên</label>
             <input type="text" id="new-staff-name" class="form-control" placeholder="Nguyễn Văn A" style="font-size: 0.85rem; padding: 0.5rem">
          </div>
          <div style="flex: 0.7; min-width: 120px">
             <label style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 0.3rem">Vai trò</label>
             <select id="new-staff-role" class="form-control" style="font-size: 0.85rem; padding: 0.5rem">
                ${(window.state?.settings?.serviceRoles||[]).map(o=>`<option>${o}</option>`).join("")}
             </select>
          </div>
          <div style="flex: 0.7; min-width: 120px">
             <label style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 0.3rem">SĐT (Zalo)</label>
             <input type="text" id="new-staff-phone" class="form-control" placeholder="09xxxxxxxx" style="font-size: 0.85rem; padding: 0.5rem">
          </div>
          <div style="display: flex; gap: 0.5rem">
             <button class="btn btn-primary btn-sm" onclick="window.addStaff({name:document.getElementById('new-staff-name').value,role:document.getElementById('new-staff-role').value,phone:document.getElementById('new-staff-phone').value,bank:{no:'',name:'',bank:''}})">Thêm</button>
             <button class="btn btn-secondary btn-sm" onclick="document.getElementById('admin-add-staff-form').style.display='none'">Hủy</button>
          </div>
       </div>

       <div style="margin-top: 1.5rem; max-height: 400px; overflow-y: auto; border: 1px solid var(--border); border-radius: 8px">
          <table class="data-table" style="width: 100%; border-collapse: collapse">
            <thead style="background: rgba(0,0,0,0.04); position: sticky; top: 0; z-index: 10">
               <tr>
                 <th style="padding: 0.75rem; text-align: left; font-size: 0.75rem">Tên</th>
                 <th style="padding: 0.75rem; text-align: left; font-size: 0.75rem">Vai trò</th>
                 <th style="padding: 0.75rem; text-align: left; font-size: 0.75rem">SĐT / TK Ngân Hàng</th>
                 <th style="padding: 0.75rem; text-align: right; font-size: 0.75rem">Thao tác</th>
               </tr>
            </thead>
            <tbody>
              ${t.staff.map(o=>{const s=o.name.replace(/'/g,"\\'");return`
                 <tr style="border-top: 1px solid var(--border)">
                   <td style="padding: 0.75rem; font-size: 0.85rem; font-weight: 700">${o.name}</td>
                   <td style="padding: 0.75rem; font-size: 0.85rem"><span class="badge" style="background: rgba(59,130,246,0.1); color: #3b82f6">${o.role}</span></td>
                   <td style="padding: 0.75rem; font-size: 0.85rem">
                     <div>${o.phone||"-"}</div>
                     <div style="font-size: 0.7rem; color: var(--text-dim)">${o.bank?.no?o.bank.no+" - "+(o.bank.name||""):""}</div>
                   </td>
                   <td style="padding: 0.75rem; text-align: right; white-space: nowrap">
                      <button class="btn btn-secondary btn-sm" onclick="window.showEditStaff('${s}')" title="Sửa"><i class="fas fa-pen"></i></button>
                      <button class="btn btn-secondary btn-sm" style="color: var(--danger)" onclick="if(confirm('Xóa nhân sự ${s}?')) window.removeStaff('${s}')" title="Xóa"><i class="fas fa-trash"></i></button>
                   </td>
                 </tr>
                 <tr id="edit-form-${s}" style="display: none; background: rgba(59,130,246,0.02)">
                    <td colspan="4" style="padding: 1rem; border-top: 1px dashed var(--border)">
                       <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem">
                          <div><label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Tên</label><input class="form-control" id="edit-name-${s}" value="${o.name}" style="font-size: 0.85rem; padding: 0.4rem"></div>
                          <div><label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Vai trò</label><select class="form-control" id="edit-role-${s}" style="font-size: 0.85rem; padding: 0.4rem">
                             ${(window.state?.settings?.serviceRoles||[]).map(a=>`<option ${o.role===a?"selected":""}>${a}</option>`).join("")}
                          </select></div>
                       </div>
                       <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem">
                          <div><label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">SĐT (Zalo)</label><input class="form-control" id="edit-phone-${s}" value="${o.phone||""}" style="font-size: 0.85rem; padding: 0.4rem"></div>
                          <div><label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Số TK</label><input class="form-control" id="edit-bankno-${s}" value="${o.bank?.no||""}" style="font-size: 0.85rem; padding: 0.4rem"></div>
                          <div><label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Ngân hàng</label><input class="form-control" id="edit-bankname-${s}" value="${o.bank?.bank||""}" style="font-size: 0.85rem; padding: 0.4rem"></div>
                       </div>
                       <div style="display: flex; gap: 0.5rem">
                          <button class="btn btn-primary btn-sm" onclick="window.saveStaffEdit('${s}')">Lưu</button>
                          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('edit-form-${s}').style.display='none'">Hủy</button>
                       </div>
                    </td>
                 </tr>
                 `}).join("")}
            </tbody>
          </table>
       </div>
    </div>
    `:""}

    <!-- SYSTEM OPERATIONS PANEL -->
    <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2rem; border: 1px solid var(--border)">
       <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 1.25rem; color: #f59e0b"><i class="fas fa-server" style="margin-right: 0.5rem"></i>Thao tác Hệ thống & Đồng bộ</h3>
       <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem">
          <div style="background: rgba(0,0,0,0.02); border: 1px solid var(--border); padding: 1rem; border-radius: 10px; display: flex; flex-direction: column; gap: 0.5rem">
             <div style="font-weight: 800; color: var(--text-main)"><i class="fas fa-sync-alt" style="color: #3b82f6"></i> Google Sheets</div>
             <div style="font-size: 0.75rem; color: var(--text-dim); margin-bottom: 0.5rem">Đồng bộ 2 chiều dữ liệu Job với file Sheets.</div>
             <button class="btn btn-secondary btn-sm" onclick="window.navigate('sync')" style="margin-top: auto; padding: 0.4rem; font-weight: 700">Mở Đồng Bộ</button>
          </div>
          <div style="background: rgba(0,0,0,0.02); border: 1px solid var(--border); padding: 1rem; border-radius: 10px; display: flex; flex-direction: column; gap: 0.5rem">
             <div style="font-weight: 800; color: var(--text-main)"><i class="fas fa-database" style="color: #8b5cf6"></i> NAS & Drive</div>
             <div style="font-size: 0.75rem; color: var(--text-dim); margin-bottom: 0.5rem">Theo dõi tiến trình Backup & Source.</div>
             <button class="btn btn-secondary btn-sm" onclick="window.navigate('nas')" style="margin-top: auto; padding: 0.4rem; font-weight: 700">Mở Quản lý NAS</button>
          </div>
          <div style="background: rgba(0,0,0,0.02); border: 1px solid var(--border); padding: 1rem; border-radius: 10px; display: flex; flex-direction: column; gap: 0.5rem">
             <div style="font-weight: 800; color: var(--text-main)"><i class="fas fa-trash-alt" style="color: #ef4444"></i> Thùng Rác</div>
             <div style="font-size: 0.75rem; color: var(--text-dim); margin-bottom: 0.5rem">Khôi phục dự án hoặc xóa vĩnh viễn dữ liệu rác.</div>
             <button class="btn btn-secondary btn-sm" onclick="window.navigate('trash')" style="margin-top: auto; padding: 0.4rem; font-weight: 700; color: var(--danger)">Mở Thùng Rác</button>
          </div>
       </div>

       <div style="margin-top: 1rem; padding: 1rem; border: 1px solid var(--border); border-radius: 10px; background: rgba(0,0,0,0.02)">
          <h4 style="color:var(--text-main); margin-bottom: 0.4rem; font-size: 0.85rem; font-weight: 800">🔄 Đẩy dữ liệu lên Cloud</h4>
          <p style="font-size:0.75rem;color:var(--text-dim);margin-bottom:0.8rem">Dùng tính năng này khi bạn thiết lập app lần đầu để lấy bộ dữ liệu từ ổ cứng máy tính này đẩy trọn bộ lên hệ thống Cloud hiện tại.</p>
          <button class="btn btn-primary btn-sm" style="background:#f59e0b; font-weight: 800" onclick="window.forceSyncAllDataToCloud()">⬆️ Đẩy Toàn bộ Dữ liệu máy này lên Cloud</button>
       </div>
    </div>

    <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2rem">
       <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 1.25rem; color: #8b5cf6"><i class="fas fa-tags" style="margin-right: 0.5rem"></i>Quản lý Danh mục (Categories)</h3>
       
       <div style="margin-bottom: 1.5rem">
         <label style="font-size: 0.8rem; font-weight: 800; color: var(--text-main); display: block; margin-bottom: 0.5rem">Hạng mục Sự kiện (Event Categories)</label>
         <p style="font-size: 0.75rem; color: var(--text-dim); margin-bottom: 0.5rem">Nhập các hạng mục phân tách nhau bằng dấu phẩy (,)</p>
         <input type="text" id="setting-event-categories" class="form-control" value="${(t.settings.eventCategories||[]).join(", ")}" style="font-size: 0.85rem; padding: 0.6rem">
       </div>

       <div style="margin-bottom: 1.5rem">
         <label style="font-size: 0.8rem; font-weight: 800; color: var(--text-main); display: block; margin-bottom: 0.5rem">Vai trò Dịch vụ (Service Roles)</label>
         <p style="font-size: 0.75rem; color: var(--text-dim); margin-bottom: 0.5rem">Nhập các vai trò phân tách nhau bằng dấu phẩy (,)</p>
         <input type="text" id="setting-service-roles" class="form-control" value="${(t.settings.serviceRoles||[]).join(", ")}" style="font-size: 0.85rem; padding: 0.6rem">
       </div>

       <button class="btn btn-primary btn-sm" onclick="window.saveCategories()">💾 Lưu Danh mục</button>
    </div>

     <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2rem">
       <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 0.5rem; color: #10b981"><i class="fas fa-cloud" style="margin-right: 0.5rem"></i>Cấu hình Đám Mây (Firebase)</h3>
       <p style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 1rem">Dán đoạn mã JSON Firebase Config để kết nối App với Realtime Database. <a href="#" style="color: var(--accent-blue)">Xem hướng dẫn</a></p>
       <textarea id="setting-firebase-config" class="form-control" placeholder='{
  "apiKey": "...",
  "authDomain": "...",
  "databaseURL": "...",
  "projectId": "...",
  "storageBucket": "...",
  "messagingSenderId": "...",
  "appId": "..."
}' style="width: 100%; height: 120px; font-family: monospace; font-size: 0.8rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border: 1px solid var(--border); border-radius: 8px">${t.settings.firebaseConfig||""}</textarea>
       <button class="btn btn-primary btn-sm" style="margin-top: 1rem" onclick="window.saveFirebaseConfig()">💾 Lưu Config & Nối mạng</button>

       <div style="margin-top: 1.5rem; border-top: 1px dashed var(--border); padding-top: 1rem">
         <span style="font-size: 0.75rem; color: var(--text-dim); display: block; margin-bottom: 0.5rem; font-weight: 700">Công cụ đồng bộ bổ sung:</span>
         <button class="btn btn-secondary btn-sm" style="margin-bottom: 0.5rem; padding: 0.4rem 0.8rem" onclick="window.migrateLocalPortfolioToFirebase()">🚀 Migrate Local Portfolio → Firebase</button>
         <button class="btn btn-secondary btn-sm" style="padding: 0.4rem 0.8rem" onclick="window.reconcilePortfolioNow()">🧩 Reconcile Portfolio 2 chiều</button>
       </div>
    </div>

    <!-- SMART AUTOMATION INTEGRATIONS PANEL -->
    <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2rem; border-left: 4px solid #f43f5e">
       <h3 style="font-size: 1rem; font-weight: 900; margin-bottom: 1rem; color: #f43f5e"><i class="fas fa-robot" style="margin-right: 0.5rem"></i>Cấu hình Smart Automation</h3>
       <p style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 1.5rem">Tích hợp Trí tuệ 3B: Tự động Báo lịch (Zalo), Tự động Báo bùng (Telegram), Tự động Bóc Folder (Drive).</p>
       
       <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem">
          <!-- Zalo ZNS -->
          <div style="background: rgba(0,0,0,0.02); border: 1px solid var(--border); padding: 1.25rem; border-radius: 12px">
             <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem">
                <div style="font-weight: 900; color: #0068ff"><i class="fas fa-comment-sms"></i> Zalo ZNS API</div>
                <label class="switch" style="position:relative;display:inline-block;width:34px;height:20px">
                  <input type="checkbox" id="setting-zalo-enable" ${t.settings.zaloEnable?"checked":""} style="opacity:0;width:0;height:0">
                  <span class="slider round" style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;transition:.4s;border-radius:34px"></span>
                </label>
             </div>
             <p style="font-size: 0.7rem; color: var(--text-dim); margin-bottom: 0.8rem; line-height: 1.4">Tự động bắn ZNS nhắc lịch cô dâu / chú rể trước sự kiện 1 ngày.</p>
             <input type="text" id="setting-zalo-token" class="form-control" placeholder="Nhập Zalo OA Access Token..." value="${t.settings.zaloToken||""}" style="width: 100%; font-size: 0.8rem; padding: 0.5rem; background: #fff; border: 1px solid var(--border); margin-bottom: 0.5rem">
             <input type="text" id="setting-zalo-template" class="form-control" placeholder="Template ID (Ví dụ: 297123)" value="${t.settings.zaloTemplateId||""}" style="width: 100%; font-size: 0.8rem; padding: 0.5rem; background: #fff; border: 1px solid var(--border)">
          </div>

          <!-- Telegram Bot -->
          <div style="background: rgba(0,0,0,0.02); border: 1px solid var(--border); padding: 1.25rem; border-radius: 12px">
             <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem">
                <div style="font-weight: 900; color: #0ea5e9"><i class="fab fa-telegram-plane"></i> Telegram Notifier</div>
                <label class="switch" style="position:relative;display:inline-block;width:34px;height:20px">
                  <input type="checkbox" id="setting-tele-enable" ${t.settings.teleEnable?"checked":""} style="opacity:0;width:0;height:0">
                  <span class="slider round" style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;transition:.4s;border-radius:34px"></span>
                </label>
             </div>
             <p style="font-size: 0.7rem; color: var(--text-dim); margin-bottom: 0.8rem; line-height: 1.4">Ping thông báo Job mới / Lịch Gấp thẳng vào Group Chat của Studio.</p>
             <input type="password" id="setting-tele-bot" class="form-control" placeholder="Bot Token (Ví dụ: 1234:AA-xyz...)" value="${t.settings.teleBotToken||""}" style="width: 100%; font-size: 0.8rem; padding: 0.5rem; background: #fff; border: 1px solid var(--border); margin-bottom: 0.5rem">
             <input type="text" id="setting-tele-chatid" class="form-control" placeholder="Group Chat ID (Ví dụ: -100987654...)" value="${t.settings.teleChatId||""}" style="width: 100%; font-size: 0.8rem; padding: 0.5rem; background: #fff; border: 1px solid var(--border)">
          </div>

          <!-- Google Drive API -->
          <div style="background: rgba(0,0,0,0.02); border: 1px solid var(--border); padding: 1.25rem; border-radius: 12px">
             <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem">
                <div style="font-weight: 900; color: #16a34a"><i class="fab fa-google-drive"></i> Drive Auto-Folder</div>
                <label class="switch" style="position:relative;display:inline-block;width:34px;height:20px">
                  <input type="checkbox" id="setting-drive-enable" ${t.settings.driveEnable?"checked":""} style="opacity:0;width:0;height:0">
                  <span class="slider round" style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;transition:.4s;border-radius:34px"></span>
                </label>
             </div>
             <p style="font-size: 0.7rem; color: var(--text-dim); margin-bottom: 0.8rem; line-height: 1.4">Tự động gọi API tạo Folder <code>[MãHD_TênKH]</code> trống khi ấn "Tạo Job" thành công.</p>
             <input type="text" id="setting-drive-parent" class="form-control" placeholder="Parent Folder ID (Mã thư mục cha)" value="${t.settings.driveParentId||""}" style="width: 100%; font-size: 0.8rem; padding: 0.5rem; background: #fff; border: 1px solid var(--border); margin-bottom: 0.5rem">
             <input type="password" id="setting-drive-client" class="form-control" placeholder="Service Account JSON/Client Secret" value="${t.settings.driveClientSecret||""}" style="width: 100%; font-size: 0.8rem; padding: 0.5rem; background: #fff; border: 1px solid var(--border)">
          </div>
       </div>

       <button class="btn btn-primary" style="margin-top: 1.5rem; width: 100%; text-align: center; justify-content: center; background: #f43f5e; border-color: #e11d48; font-weight: 900" onclick="window.saveSmartIntegrations()">🚀 BẬT KÍCH HOẠT AUTOMATION</button>
    </div>

    <div class="glass-panel" style="padding: 1.5rem">
       <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 1.25rem; color: var(--accent-orange)"><i class="fas fa-database" style="margin-right: 0.5rem"></i>Sao lưu & Khôi phục</h3>
       <div style="display: flex; gap: 1rem">
          <button class="btn btn-primary btn-sm" onclick="window.exportJSON()"><i class="fas fa-download"></i> Xuất dữ liệu (JSON)</button>
          <button class="btn btn-secondary btn-sm" onclick="window.importJSON()"><i class="fas fa-upload"></i> Nhập dữ liệu</button>
          <button class="btn btn-secondary btn-sm" style="color: var(--danger)" onclick="if(confirm('Reset toàn bộ dữ liệu? Hành động này không thể hoàn tác!')) window.resetAllData()"><i class="fas fa-exclamation-triangle"></i> Reset dữ liệu</button>
       </div>
       <p style="font-size: 0.75rem; color: var(--text-dim); margin-top: 1rem">Lưu ý: Tất cả dữ liệu hiện đang lưu trong bộ nhớ. Export JSON để backup.</p>
    </div>
`,e}function Io(t){const e=document.createElement("div");e.className="view-container reveal";const n=[{id:"Chưa bắt đầu",label:"Chưa bắt đầu",color:"#94a3b8",icon:"⏳"},{id:"Đang cắt",label:"Đang cắt",color:"#3b82f6",icon:"✂️"},{id:"Demo",label:"Demo",color:"#f59e0b",icon:"🖥️"},{id:"Chỉnh sửa",label:"Chỉnh sửa",color:"#8b5cf6",icon:"🔧"},{id:"Hoàn thành",label:"Hoàn thành",color:"#22c55e",icon:"✅"}],i=[];(t.filteredJobs||t.jobs).forEach(a=>{(a.deliverables||[]).forEach((l,d)=>{if(l.type==="Video"){const c=new Date;c.setHours(0,0,0,0);const f=new Date(a.date);f.setHours(0,0,0,0);const u=new Date(f);u.setDate(u.getDate()+20);const h=Math.ceil((u-c)/864e5);i.push({jobId:a.id,sIdx:d,client:a.client,service:l.name,qty:l.quantity||1,staff:l.staff||"—",editor:l.editor||"—",editStatus:l.editStatus||"Chưa bắt đầu",date:a.date,daysLeft:h,deadlineStr:u.toLocaleDateString("vi-VN")})}})});const r=[...new Set(i.map(a=>a.editor).filter(a=>a&&a!=="—"))].sort(),o=t.kanbanEditorFilter||"TẤT CẢ",s=o==="TẤT CẢ"?i:i.filter(a=>a.editor===o);return e.innerHTML=`
  <header class="section-header">
      <h1 class="view-title">📋 Kanban Board</h1>
      <span style="font-size:0.85rem;color:var(--text-dim)">${s.length}/${i.length} clip</span>
    </header>

    <!--Editor filter chips-->
  <div style="display:flex;gap:0.35rem;flex-wrap:wrap;margin-top:0.75rem;margin-bottom:0.75rem">
    <button onclick="window.setKanbanEditorFilter('TẤT CẢ')" style="font-size:0.72rem;padding:0.2rem 0.65rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;${o==="TẤT CẢ"?"background:var(--primary);color:#fff;border:none":"background:var(--bg-card);color:var(--text-dim);border:1px solid var(--border)"}">Tất cả (${i.length})</button>
    ${r.map(a=>`<button onclick="window.setKanbanEditorFilter('${a}')" style="font-size:0.72rem;padding:0.2rem 0.65rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;${o===a?"background:#a855f7;color:#fff;border:none":"background:var(--bg-card);color:var(--text-dim);border:1px solid var(--border)"}">✏️ ${a} (${i.filter(l=>l.editor===a).length})</button>`).join("")}
  </div>

    ${s.length===0?`
      <div style="text-align:center;padding:2.5rem 1rem;margin-bottom:1rem;background:var(--bg-card);border-radius:16px;border:1px dashed var(--border-bright)">
        <div class="empty-state-icon" style="font-size:3rem;margin-bottom:0.75rem">🎬</div>
        <h3 style="font-size:1.1rem;font-weight:800;color:var(--text-main);margin-bottom:0.3rem">Chưa có video clip nào</h3>
        <p style="font-size:0.82rem;color:var(--text-dim);max-width:320px;margin:0 auto">Thêm thành phẩm Video vào dự án để theo dõi tiến độ hậu kỳ tại đây.</p>
      </div>
    `:""}

<div class="kanban-board" style="display:flex;gap:0.6rem;overflow-x:auto;padding-bottom:1rem;min-height:400px">
  ${n.map(a=>`
        <div class="kanban-column" style="flex:1;min-width:200px;background:var(--bg-card);border-radius:12px;padding:0.6rem;border:1px solid var(--border)">
          <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.8rem;padding-bottom:0.5rem;border-bottom:2px solid ${a.color}">
            <span>${a.icon}</span>
            <span style="font-size:0.78rem;font-weight:800;color:${a.color}">${a.label}</span>
            <span style="font-size:0.65rem;background:${a.color}20;color:${a.color};padding:0.1rem 0.4rem;border-radius:10px;font-weight:800;margin-left:auto">${s.filter(l=>l.editStatus===a.id).length}</span>
          </div>
          <div class="kanban-list" data-status="${a.id}" style="min-height:60px;display:flex;flex-direction:column;gap:0.4rem">
            ${(()=>{let l=s.filter(d=>d.editStatus===a.id);return a.id==="Hoàn thành"&&l.length>50&&(l.sort((d,p)=>new Date(p.date)-new Date(d.date)),l=l.slice(0,50)),l.map(d=>{const p=window.state?.locks?.[d.jobId];return`
              <div class="kanban-card ${p?"locked-card":""}" onclick="${p?"":`window.openQuickPreview('${d.jobId}')`}" data-job-id="${d.jobId}" data-sidx="${d.sIdx}"
                style="${p?"opacity:0.6;pointer-events:none;":""} background:var(--bg-main);border:1px solid var(--border);border-radius:6px;padding:0.4rem 0.5rem;cursor:grab;border-left:3px solid ${d.daysLeft!=null&&d.daysLeft<=0||d.daysLeft!=null&&d.daysLeft<=3?"#ef4444":d.daysLeft!=null&&d.daysLeft<=7?"#f59e0b":a.color};position:relative;margin-bottom:0.4rem;box-shadow:0 1px 2px rgba(0,0,0,0.03)${d.daysLeft!=null&&d.daysLeft<=3?";background:rgba(239,68,68,0.03)":d.daysLeft!=null&&d.daysLeft<=7?";background:rgba(245,158,11,0.03)":""}">
                ${p?`<div style="position:absolute;top:-5px;right:-5px;background:#ef4444;color:#fff;font-size:0.5rem;padding:0.15rem 0.4rem;border-radius:10px;z-index:10;box-shadow:0 2px 4px rgba(0,0,0,0.2)">🔒 ${window.state.locks[d.jobId]}</div>`:""}
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.15rem">
                  <span style="font-size:0.75rem;font-weight:800;color:var(--text-main);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:130px" title="${d.client}">${d.client}</span>
                  <button onclick="event.stopPropagation();if(confirm('Xoá clip này?'))window.deleteVideoClip&&window.deleteVideoClip('${d.jobId}','${d.sIdx}')" style="background:none;border:none;cursor:pointer;font-size:0.65rem;color:#ef4444;padding:0.1rem 0.2rem;border-radius:4px;opacity:0.5" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.5">🗑️</button>
                </div>
                <div style="font-size:0.6rem;color:var(--text-dim);margin-bottom:0.3rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${d.service}">🎥 ${d.service} <strong style="color:var(--text-main)">(x${d.qty})</strong></div>
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:0.55rem;font-weight:700;color:${d.daysLeft!=null&&d.daysLeft<=0||d.daysLeft!=null&&d.daysLeft<=3?"#ef4444":d.daysLeft!=null&&d.daysLeft<=7?"#f59e0b":"var(--text-dim)"}">⏰ ${d.deadlineStr||"—"}${d.daysLeft!=null&&d.daysLeft<=3&&d.daysLeft>0?` <span style="background:#ef444420;color:#ef4444;padding:0.1rem 0.25rem;border-radius:3px;font-weight:900">${d.daysLeft}N</span>`:d.daysLeft!=null&&d.daysLeft<=7&&d.daysLeft>3?` <span style="background:#f59e0b20;color:#f59e0b;padding:0.1rem 0.25rem;border-radius:3px;font-weight:900">${d.daysLeft}N</span>`:d.daysLeft!=null&&d.daysLeft<=0?' <span style="background:#ef444420;color:#ef4444;padding:0.1rem 0.25rem;border-radius:3px;font-weight:900">QH</span>':""}</span>
                  <span style="font-size:0.55rem;font-weight:700;background:#a855f715;color:#a855f7;padding:0.15rem 0.3rem;border-radius:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:70px" title="${d.editor||"Chưa gán"}">✏️ ${d.editor||"Trống"}</span>
                </div>
              </div>
            `}).join("")})()}
          </div>
        </div>
      `).join("")}
</div>
`,setTimeout(()=>{typeof Sortable>"u"||e.querySelectorAll(".kanban-list").forEach(a=>{new Sortable(a,{group:"kanban",animation:150,ghostClass:"kanban-ghost",dragClass:"kanban-drag",filter:".locked-card",preventOnFilter:!0,onEnd:l=>{const d=l.item,p=l.to.dataset.status,c=d.dataset.jobId,f=d.dataset.sidx;window.updateVideoEditStatus&&window.updateVideoEditStatus(c,f,p)}})})},10),e}function Do(t){const e=document.createElement("div");e.className="view-container reveal";const n=document.documentElement.getAttribute("data-theme")==="dark",i=n?"#a5d6a7":"#1e4020",r=n?"rgba(34,197,94,0.1)":"rgba(0,0,0,0.06)",o=t.currentYear,s=Array(12).fill(0),a=Array(12).fill(0);t.jobs.forEach(c=>{const f=new Date(c.date);f.getFullYear()===o&&(s[f.getMonth()]+=c.package||0,a[f.getMonth()]++)}),t.jobs.forEach(c=>{c.status});const l={};t.jobs.forEach(c=>{(c.services||[]).forEach(f=>{f.staff&&(l[f.staff]=(l[f.staff]||0)+1)})});const d={};t.jobs.forEach(c=>{(c.services||[]).forEach(f=>{f.service&&(d[f.service]=(d[f.service]||0)+1)})});const p=["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"];return e.innerHTML=`
  <header class="section-header">
      <h1 class="view-title">📊 Analytics Dashboard</h1>
      <span style="font-size:0.85rem;color:var(--text-dim)">Năm ${o} — ${t.jobs.length} dự án</span>
    </header>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:1rem">
      <div class="glass-panel" style="padding:1.2rem;grid-column:1/3">
        <h3 style="font-size:0.9rem;font-weight:800;color:var(--text-dim);margin-bottom:0.8rem">💰 Doanh thu theo tháng (${o})</h3>
        <div style="height:280px;position:relative"><canvas id="chart-revenue"></canvas></div>
      </div>

      <div class="glass-panel" style="padding:1.2rem">
        <h3 style="font-size:0.9rem;font-weight:800;color:var(--text-dim);margin-bottom:0.8rem">📋 Tỉ trọng dịch vụ</h3>
        <div style="height:250px;position:relative"><canvas id="chart-services"></canvas></div>
      </div>

      <div class="glass-panel" style="padding:1.2rem">
        <h3 style="font-size:0.9rem;font-weight:800;color:var(--text-dim);margin-bottom:0.8rem">👥 Khối lượng nhân sự</h3>
        <div style="height:250px;position:relative"><canvas id="chart-editor"></canvas></div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.8rem;margin-top:1rem">
      <div class="glass-panel" style="padding:1rem;text-align:center">
        <div style="font-size:0.7rem;font-weight:700;color:var(--text-dim);text-transform:uppercase">Tổng doanh thu</div>
        <div style="font-size:1.4rem;font-weight:900;color:#22c55e;margin-top:0.3rem">${(s.reduce((c,f)=>c+f,0)/1e6).toFixed(1)}M</div>
      </div>
      <div class="glass-panel" style="padding:1rem;text-align:center">
        <div style="font-size:0.7rem;font-weight:700;color:var(--text-dim);text-transform:uppercase">Tổng dự án</div>
        <div style="font-size:1.4rem;font-weight:900;color:#3b82f6;margin-top:0.3rem">${t.jobs.length}</div>
      </div>
      <div class="glass-panel" style="padding:1rem;text-align:center">
        <div style="font-size:0.7rem;font-weight:700;color:var(--text-dim);text-transform:uppercase">TB/Tháng</div>
        <div style="font-size:1.4rem;font-weight:900;color:#f59e0b;margin-top:0.3rem">${(s.reduce((c,f)=>c+f,0)/12/1e6).toFixed(1)}M</div>
      </div>
      <div class="glass-panel" style="padding:1rem;text-align:center">
        <div style="font-size:0.7rem;font-weight:700;color:var(--text-dim);text-transform:uppercase">Nhân sự</div>
        <div style="font-size:1.4rem;font-weight:900;color:#8b5cf6;margin-top:0.3rem">${Object.keys(l).length}</div>
      </div>
    </div>
`,setTimeout(()=>{if(typeof Chart>"u")return;const c=e.querySelector("#chart-revenue");c&&new Chart(c,{type:"bar",data:{labels:p,datasets:[{label:"Doanh thu (VNĐ)",data:s,backgroundColor:p.map((h,v)=>v===new Date().getMonth()?"#22c55e":"rgba(34,197,94,0.3)"),borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{ticks:{color:i,callback:h=>(h/1e6).toFixed(0)+"M"},grid:{color:r}},x:{ticks:{color:i},grid:{display:!1}}}}});const f=e.querySelector("#chart-services");f&&new Chart(f,{type:"doughnut",data:{labels:Object.keys(d),datasets:[{data:Object.values(d),backgroundColor:["#3b82f6","#ec4899","#8b5cf6","#10b981","#f59e0b","#6366f1"],borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"right",labels:{color:i,font:{size:10}}}},cutout:"60%"}});const u=e.querySelector("#chart-editor");u&&new Chart(u,{type:"bar",data:{labels:Object.keys(l),datasets:[{label:"Số dịch vụ",data:Object.values(l),backgroundColor:"#3b82f6",borderRadius:6}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{ticks:{color:i,stepSize:1},grid:{color:r}},y:{ticks:{color:i},grid:{display:!1}}}}})},100),e}function Lo(t){const e=document.createElement("div");e.className="view-container reveal";const n=i=>i.includes("Thêm")||i.includes("Tạo")?{icon:"fa-plus-circle",color:"#34d399"}:i.includes("Sửa")||i.includes("Cập nhật")||i.includes("Lưu")?{icon:"fa-edit",color:"#60a5fa"}:i.includes("Xóa")||i.includes("Xoá")?{icon:"fa-trash",color:"#f87171"}:i.includes("backup")||i.includes("Backup")||i.includes("Xuất")||i.includes("Nhập")?{icon:"fa-database",color:"#a78bfa"}:{icon:"fa-info-circle",color:"#22c55e"};return e.innerHTML=`
  <header class="section-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem">
       <div>
         <h1 class="view-title">📋 Lịch sử hoạt động</h1>
         <span style="font-size: 0.85rem; color: var(--text-dim)">${t.history.length} hoạt động</span>
       </div>
       <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
         <button onclick="window.exportBackup()" style="background:#22c55e;color:#fff;border:none;padding:0.5rem 1rem;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit;font-size:0.85rem">
           💾 Xuất Backup
         </button>
         <button onclick="window.importBackup()" style="background:var(--accent-soft);color:var(--primary);border:1px solid var(--border-bright);padding:0.5rem 1rem;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit;font-size:0.85rem">
           📥 Nhập Backup
         </button>
       </div>
    </header>

  <div class="glass-panel" style="margin-top: 1.5rem; padding: 1.5rem">
    <div style="position: relative; padding-left: 2rem">
      <div style="position: absolute; left: 0.55rem; top: 0; bottom: 0; width: 2px; background: linear-gradient(180deg, #22c55e, rgba(34,197,94,0.1))"></div>
      ${t.history.slice(0,100).map(i=>{const r=n(i.action);return`
            <div style="position: relative; margin-bottom: 1.25rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border)">
               <div style="position: absolute; left: -1.55rem; top: 0.2rem; width: 12px; height: 12px; border-radius: 50%; background: ${r.color}; box-shadow: 0 0 8px ${r.color}40"></div>
               <div style="display: flex; justify-content: space-between; align-items: flex-start">
                  <div style="flex: 1">
                     <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem">
                        <i class="fas ${r.icon}" style="font-size: 0.75rem; color: ${r.color}"></i>
                        <span style="font-size: 0.9rem; font-weight: 700">${i.action}</span>
                     </div>
                     <div style="font-size: 0.75rem; color: var(--text-dim)"><i class="fas fa-user" style="margin-right: 0.3rem"></i>${i.user}</div>
                     ${i.details?`<div style="font-size:0.72rem;color:var(--text-muted);margin-top:0.2rem;padding:0.3rem 0.5rem;background:var(--accent-soft);border-radius:6px;font-family:monospace">${i.details}</div>`:""}
                  </div>
                  <div style="font-size: 0.75rem; font-family: monospace; color: var(--text-dim); white-space: nowrap">${new Date(i.time).toLocaleString("vi-VN")}</div>
               </div>
            </div>`}).join("")}
    </div>
  </div>
`,e}function zo(t){const e=document.createElement("div");e.className="view-container reveal";const n=[...t.staff].sort((s,a)=>s.name.localeCompare(a.name)),i=t.jobs.filter(s=>{if(s.isTrash)return!1;const a=new Date(s.date);return Number.isNaN(a.getTime())?!1:a.getMonth()+1===t.currentMonth&&a.getFullYear()===t.currentYear}),r={};n.forEach(s=>{r[s.name]={shootMoney:0,shootPaid:0,shootOwed:0,shootJobs:0,editMoney:0,editPaid:0,editOwed:0,editClips:0}}),i.forEach(s=>{(s.services||[]).forEach(a=>{if(a.staff&&r[a.staff]){r[a.staff].shootJobs++;const l=Number(a.cost)||0;r[a.staff].shootMoney+=l,a.paid?r[a.staff].shootPaid+=l:r[a.staff].shootOwed+=l}}),(s.services||[]).forEach((a,l)=>{if(a.editStaff&&r[a.editStaff]&&a.editStatus==="Hoàn thành"){r[a.editStaff].editClips++;const d=Number(a.edit)||0;r[a.editStaff].editMoney+=d,a.editPaid?r[a.editStaff].editPaid+=d:r[a.editStaff].editOwed+=d}}),(s.deliverables||[]).forEach(a=>{a.editor&&r[a.editor]&&a.editStatus==="Hoàn thành"&&(a._isCountedObj||r[a.editor].editClips++)})});const o=(window.state?.settings?.serviceRoles||["Photo Lead","Cinema Lead","Photographer / Asst","Cinema","CTV"]).map(s=>`<option> ${s}</option> `).join("");return e.innerHTML=`
  <header class="section-header">
      <div>
        <h1 class="view-title">Quản Lý Nhân Sự &amp; Bảng Lương</h1>
        <p style="color: var(--text-dim); font-size: 0.9rem;">Danh sách nhân sự &amp; Hệ thống tự động tính lương tháng ${t.currentMonth}/${t.currentYear}</p>
      </div>
      <div>
        <button class="btn btn-primary" onclick="document.getElementById('staff-add-form').style.display = document.getElementById('staff-add-form').style.display === 'none' ? 'block' : 'none'">
          <i class="fas fa-plus"></i> Thêm Nhân Sự
        </button>
      </div>
    </header>

    <!--INLINE ADD STAFF FORM-->
    <div id="staff-add-form" class="glass-panel" style="display:none; padding:1.5rem; margin-bottom:1.5rem; border:2px solid rgba(22,163,74,0.3); background:rgba(22,163,74,0.03)">
      <h3 style="font-size:1rem; font-weight:800; margin-bottom:1rem; color:var(--primary)"><i class="fas fa-user-plus" style="margin-right:0.5rem"></i>Thêm Nhân Sự Mới</h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:1rem; margin-bottom:1rem">
        <div>
          <label style="font-size:0.7rem; color:var(--text-dim); text-transform:uppercase; font-weight:800; display:block; margin-bottom:0.3rem">Tên nhân sự *</label>
          <input type="text" id="staff-add-name" class="form-control" placeholder="Nguyễn Văn A" style="font-size:0.85rem; padding:0.6rem">
        </div>
        <div>
          <label style="font-size:0.7rem; color:var(--text-dim); text-transform:uppercase; font-weight:800; display:block; margin-bottom:0.3rem">Vai trò</label>
          <select id="staff-add-role" class="form-control" multiple style="font-size:0.85rem; padding:0.6rem; height: 100px;">
            ${o}
          </select>
        </div>
        <div>
          <label style="font-size:0.7rem; color:var(--text-dim); text-transform:uppercase; font-weight:800; display:block; margin-bottom:0.3rem">Số điện thoại</label>
          <input type="text" id="staff-add-phone" class="form-control" placeholder="09xxxxxxxx" style="font-size:0.85rem; padding:0.6rem">
        </div>
        <div>
          <label style="font-size:0.7rem; color:var(--text-dim); text-transform:uppercase; font-weight:800; display:block; margin-bottom:0.3rem">Số TK Ngân hàng</label>
          <input type="text" id="staff-add-bankno" class="form-control" placeholder="00xxxxxxxxx" style="font-size:0.85rem; padding:0.6rem">
        </div>
        <div>
          <label style="font-size:0.7rem; color:var(--text-dim); text-transform:uppercase; font-weight:800; display:block; margin-bottom:0.3rem">Tên chủ TK</label>
          <input type="text" id="staff-add-bankname" class="form-control" placeholder="NGUYEN VAN A" style="font-size:0.85rem; padding:0.6rem">
        </div>
        <div>
          <label style="font-size:0.7rem; color:var(--text-dim); text-transform:uppercase; font-weight:800; display:block; margin-bottom:0.3rem">Ngân hàng</label>
          <input type="text" id="staff-add-bank" class="form-control" placeholder="Vietcombank" style="font-size:0.85rem; padding:0.6rem">
        </div>
      </div>
      <div style="display:flex; gap:0.5rem">
        <button class="btn btn-primary btn-sm" onclick="window.submitAddStaff()"><i class="fas fa-check" style="margin-right:0.3rem"></i>Thêm nhân sự</button>
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('staff-add-form').style.display='none'">Hủy</button>
      </div>
    </div>

    <!--PAYROLL AUTOMATION TABLE-->
    <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:12px; margin-bottom:2rem; overflow:hidden">
      <div style="padding:1rem 1.25rem; background:rgba(22,163,74,0.05); border-bottom:1px solid var(--border); display:flex; justify-content:space-between; align-items:center">
        <div style="font-weight:900; color:var(--text-main); font-size:1.1rem">💰 Bảng Kê Lương Tháng ${t.currentMonth}/${t.currentYear}</div>
        <div style="font-size:0.8rem; color:var(--success); font-weight:800; background:rgba(22,163,74,0.1); padding:0.25rem 0.6rem; border-radius:6px">Tự Động Tính</div>
      </div>
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; min-width:800px; text-align:left; font-size:0.85rem">
          <thead>
            <tr style="background:var(--bg-body); color:var(--text-dim); font-size:0.75rem; text-transform:uppercase;">
              <th style="padding:0.75rem 1rem; font-weight:800; border-bottom:1px solid var(--border)">Nhân Sự</th>
              <th style="padding:0.75rem 1rem; font-weight:800; border-bottom:1px solid var(--border)">Vai Trò</th>
              <th style="padding:0.75rem 1rem; font-weight:800; border-bottom:1px solid var(--border); text-align:right">Shoots tham gia</th>
              <th style="padding:0.75rem 1rem; font-weight:800; border-bottom:1px solid var(--border); text-align:right">Hoa hồng Biên/Dựng</th>
              <th style="padding:0.75rem 1rem; font-weight:800; border-bottom:1px solid var(--border); text-align:right">Tổng Thu Nhập</th>
              <th style="padding:0.75rem 1rem; font-weight:800; border-bottom:1px solid var(--border); text-align:right; color:var(--success)">Đã Thanh Toán</th>
              <th style="padding:0.75rem 1rem; font-weight:800; border-bottom:1px solid var(--border); text-align:right; color:var(--danger)">CÒN NỢ</th>
            </tr>
          </thead>
          <tbody>
            ${n.map(s=>{const a=r[s.name],l=a.shootMoney+a.editMoney,d=a.shootPaid+a.editPaid,p=a.shootOwed+a.editOwed;return l===0&&a.editClips===0&&a.shootJobs===0?"":`
              <tr style="border-bottom:1px solid var(--border-bright); transition:0.2s" onmouseover="this.style.background='var(--bg-hover)'" onmouseout="this.style.background='transparent'">
                <td style="padding:0.75rem 1rem; font-weight:800; color:var(--text-main)">${s.name}</td>
                <td style="padding:0.75rem 1rem; color:var(--text-dim)">${s.role||"Staff"}</td>
                <td style="padding:0.75rem 1rem; text-align:right; font-weight:600">
                  ${a.shootJobs} jobs<br>
                  <span style="font-size:0.7rem; color:var(--text-dim)">${D(a.shootMoney)}</span>
                </td>
                <td style="padding:0.75rem 1rem; text-align:right; font-weight:600">
                  ${a.editClips} clips<br>
                  <span style="font-size:0.7rem; color:var(--text-dim)">${D(a.editMoney)}</span>
                </td>
                <td style="padding:0.75rem 1rem; text-align:right; font-weight:800; color:var(--primary)">${D(l)}</td>
                <td style="padding:0.75rem 1rem; text-align:right; font-weight:800; color:var(--success)">${D(d)}</td>
                <td style="padding:0.75rem 1rem; text-align:right; font-weight:900; color:var(--danger)">${D(p)}</td>
              </tr>
              `}).join("")||'<tr><td colspan="7" style="padding:1.5rem; text-align:center; color:var(--text-dim)">Chưa có dữ liệu lương tháng này, cần phát sinh thêm Job đi chụp hoặc Clip hoàn thành.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>

    <h2 style="font-size:1.1rem; font-weight:800; margin-bottom:1rem; color:var(--text-main)">Danh Bạ Nhân Sự</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem">
      ${n.map(s=>{const a=s.name.replace(/'/g,"\\'");return`
        <div class="glass-panel" style="padding: 1.25rem" id="staff-card-${s.name.replace(/\s/g,"-")}">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem">
            <h3 style="font-size: 1.1rem; color: var(--text-main)">${s.name}</h3>
            <span style="font-size: 0.75rem; color: var(--text-dim); background: var(--bg-hover); padding: 0.1rem 0.4rem; border-radius: 4px">${Array.isArray(s.role)?s.role.join(", "):s.role||""}</span>
          </div>
          <div style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 0.25rem">
            <i class="fas fa-phone" style="width:16px"></i> ${s.phone||"Chưa có SĐT"}
          </div>
          <div style="color: var(--text-dim); font-size: 0.8rem; margin-bottom: 0.75rem">
            <i class="fas fa-university" style="width:16px"></i> ${s.bank?.no?s.bank.no+" - "+(s.bank.name||""):"Chưa có TK"}
          </div>
          <!-- INLINE EDIT FORM (hidden) -->
          <div id="staff-edit-${s.name.replace(/\s/g,"-")}" style="display:none; padding:0.75rem; margin-bottom:0.75rem; background:rgba(59,130,246,0.04); border:1px solid rgba(59,130,246,0.15); border-radius:8px">
            <div style="display:grid; gap:0.5rem; margin-bottom:0.5rem">
              <input type="text" id="edit-name-${a}" class="form-control" value="${s.name}" placeholder="Tên" style="font-size:0.8rem; padding:0.4rem 0.6rem">
              <select id="edit-role-${a}" class="form-control" multiple style="font-size:0.8rem; padding:0.4rem 0.6rem; height: 100px;">
                ${(window.state?.settings?.serviceRoles||["Photo Lead","Cinema Lead","Photographer / Asst","Cinema","CTV"]).map(l=>`<option ${Array.isArray(s.role)?s.role.includes(l)?"selected":"":s.role===l?"selected":""}>${l}</option>`).join("")}
              </select>
              <input type="text" id="edit-phone-${a}" class="form-control" value="${s.phone||""}" placeholder="SĐT" style="font-size:0.8rem; padding:0.4rem 0.6rem">
              <input type="text" id="edit-bankno-${a}" class="form-control" value="${s.bank?.no||""}" placeholder="Số TK" style="font-size:0.8rem; padding:0.4rem 0.6rem">
              <input type="text" id="edit-bankname-${a}" class="form-control" value="${s.bank?.name||""}" placeholder="Tên chủ TK" style="font-size:0.8rem; padding:0.4rem 0.6rem">
              <input type="text" id="edit-bank-${a}" class="form-control" value="${s.bank?.bank||""}" placeholder="Ngân hàng" style="font-size:0.8rem; padding:0.4rem 0.6rem">
            </div>
            <div style="display:flex; gap:0.4rem">
              <button class="btn btn-primary btn-sm" style="flex:1; font-size:0.75rem" onclick="window.submitEditStaff('${a}')">Lưu</button>
              <button class="btn btn-secondary btn-sm" style="font-size:0.75rem" onclick="document.getElementById('staff-edit-${s.name.replace(/\s/g,"-")}').style.display='none'">Hủy</button>
            </div>
          </div>
          <div style="display: flex; gap: 0.4rem">
             <button class="btn btn-secondary btn-sm" style="flex: 1" onclick="document.getElementById('staff-edit-${s.name.replace(/\s/g,"-")}').style.display = document.getElementById('staff-edit-${s.name.replace(/\s/g,"-")}').style.display === 'none' ? 'block' : 'none'"><i class="fas fa-pen" style="margin-right:0.3rem"></i>Sửa</button>
             <button class="btn btn-secondary btn-sm" style="color: var(--danger); border-color: rgba(239,68,68,0.2)" onclick="window.deleteStaff('${a}')"><i class="fas fa-trash"></i></button>
          </div>
        </div>`}).join("")}
    </div>
`,e}function Ao(t){const e=document.createElement("div");return e.className="view-container reveal",e.innerHTML=`
  <header class="section-header">
       <h1 class="view-title">NAS / Drive — Cấu hình hệ thống</h1>
       <button class="btn btn-primary btn-sm"><i class="fas fa-save"></i> Lưu cấu hình</button>
    </header>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem">
    <div class="glass-panel" style="padding: 1.5rem">
      <h3 style="font-size: 0.95rem; margin-bottom: 1.5rem"><i class="fas fa-folder-open" style="color: var(--accent); margin-right: 0.5rem"></i>Đường dẫn hệ thống</h3>
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <div>
          <label style="font-size: 0.82rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Dữ liệu App (JSON)</label>
          <input type="text" class="form-control" value="./data.js" style="margin-top: 0.3rem; font-size: 0.8rem; padding: 0.5rem">
        </div>
        <div>
          <label style="font-size: 0.82rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Sheet Sync (URL)</label>
          <input type="text" class="form-control" value="https://docs.google.com/spreadsheets/d/1hVx..." style="margin-top: 0.3rem; font-size: 0.8rem; padding: 0.5rem">
        </div>
        <div>
          <label style="font-size: 0.82rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Thư mục Bill ảnh</label>
          <input type="text" class="form-control" value="/Volumes/NAS/Bills/2026/" style="margin-top: 0.3rem; font-size: 0.8rem; padding: 0.5rem">
        </div>
        <div>
          <label style="font-size: 0.82rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">NAS Root Folder</label>
          <input type="text" class="form-control" value="/Volumes/NAS/HaruStudio/" style="margin-top: 0.3rem; font-size: 0.8rem; padding: 0.5rem">
        </div>
      </div>
    </div>

    <div class="glass-panel" style="padding: 1.5rem">
      <h3 style="font-size: 0.95rem; margin-bottom: 1.5rem"><i class="fas fa-cogs" style="color: var(--warning); margin-right: 0.5rem"></i>Bảng quy trình tự động</h3>
      <div style="display: flex; flex-direction: column; gap: 0.75rem">
        ${[{trigger:"Khi thêm job mới",action:"Tự tạo folder NAS & Drive",status:"active"},{trigger:"Khi chỉnh sửa job",action:"Tự lưu log + backup JSON",status:"active"},{trigger:"Khi upload bill",action:"OCR tự nhận diện → Giao dịch",status:"inactive"},{trigger:"Mỗi ngày 3:00 AM",action:"Auto-backup toàn bộ data",status:"active"},{trigger:"Khi sync Google Sheet",action:"Map CD-CR, cập nhật jobs",status:"active"}].map(n=>`
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px solid var(--border)">
                   <div style="display: flex; align-items: center; gap: 0.75rem">
                      <div style="width: 8px; height: 8px; background: ${n.status==="active"?"var(--success)":"rgba(255,255,255,0.2)"}; border-radius: 50%"></div>
                      <div>
                         <div style="font-size: 0.8rem; font-weight: 600">${n.trigger}</div>
                         <div style="font-size: 0.85rem; color: var(--text-dim)">${n.action}</div>
                      </div>
                   </div>
                   <span class="badge" style="font-size: 0.55rem; background: ${n.status==="active"?"rgba(16,185,129,0.1)":"rgba(255,255,255,0.05)"}; color: ${n.status==="active"?"var(--success)":"var(--text-dim)"}">${n.status==="active"?"Hoạt động":"Tắt"}</span>
                </div>
             `).join("")}
      </div>
    </div>
  </div>
`,e}function Po(t){const e=document.createElement("div");e.className="view-container reveal";const n=t.syncLogs||[],i=t.lastSyncResult||null,r={added:"var(--success)",updated:"var(--accent-blue)",skipped:"var(--accent-orange)",error:"var(--danger)",info:"var(--text-dim)"};return e.innerHTML=`
  <header class="section-header">
       <h1 class="view-title">🔄 Sync Dữ liệu</h1>
       <div style="display: flex; gap: 0.5rem">
          <button class="btn btn-warning btn-sm" onclick="window.importGoLiveData()" style="background: var(--warning); color: #fff; border:none; margin-right: 1rem;"><i class="fas fa-magic"></i> Khởi tạo Dữ liệu Go-Live</button>
          <button class="btn btn-secondary btn-sm" onclick="window.exportCSV()"><i class="fas fa-file-export"></i> Xuất CSV</button>
          <button class="btn btn-primary btn-sm" onclick="window.runSync()"><i class="fas fa-cloud-download-alt"></i> Sync toàn bộ</button>
       </div>
    </header>

  ${i?`
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin-top: 1.5rem">
       <div class="glass-panel" style="padding: 1rem; text-align: center">
          <div style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Tổng dự án</div>
          <div style="font-size: 1.5rem; font-weight: 900">${i.total}</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; text-align: center; border-top: 3px solid var(--success)">
          <div style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Đã thêm</div>
          <div style="font-size: 1.5rem; font-weight: 900; color: var(--success)">+${i.nasAdded+i.driveAdded}</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; text-align: center; border-top: 3px solid var(--accent-blue)">
          <div style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Đã cập nhật</div>
          <div style="font-size: 1.5rem; font-weight: 900; color: var(--accent-blue)">~${i.nasUpdated+i.driveUpdated}</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; text-align: center">
          <div style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Bỏ qua</div>
          <div style="font-size: 1.5rem; font-weight: 900">${i.skipped}</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; text-align: center; border-top: 3px solid var(--danger)">
          <div style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Lỗi</div>
          <div style="font-size: 1.5rem; font-weight: 900; color: var(--danger)">${i.errors}</div>
       </div>
    </div>
    `:""}

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem">
  <div class="glass-panel" style="padding: 1.5rem">
    <h3 style="font-size: 0.95rem; margin-bottom: 1.5rem"><i class="fas fa-link" style="color: var(--primary); margin-right: 0.5rem"></i>Cấu hình Sync</h3>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <div>
        <label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Link Google Sheet</label>
        <input type="text" class="form-control" id="sync-sheet-url" value="https://docs.google.com/spreadsheets/d/1hVxXhaDMYQcv1aZfTaZCQmlC-QtHQ-oMayIetOmIRvM/edit" style="margin-top: 0.3rem; font-size: 0.8rem; padding: 0.5rem">
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem">
        <div>
          <label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">NAS Root Path</label>
          <input type="text" class="form-control" id="sync-nas-root" value="/Volumes/HARUwedding" style="margin-top: 0.3rem; font-size: 0.8rem; padding: 0.5rem">
        </div>
        <div>
          <label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Tháng / Năm</label>
          <input type="text" class="form-control" value="${t.currentMonth}/${t.currentYear}" style="margin-top: 0.3rem; font-size: 0.8rem; padding: 0.5rem" readonly>
        </div>
      </div>
      <div>
        <label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Drive Folders API (tuỳ chọn)</label>
        <input type="text" class="form-control" id="sync-drive-api" value="" placeholder="https://script.google.com/... (trả về mảng folders)" style="margin-top: 0.3rem; font-size: 0.8rem; padding: 0.5rem">
      </div>
      <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem">
        <button class="btn btn-primary btn-sm" style="flex: 1" onclick="window.runSync()"><i class="fas fa-cloud-download-alt"></i> Sync NAS + Drive</button>
        <button class="btn btn-secondary btn-sm" style="flex: 1" onclick="window.exportJSON()"><i class="fas fa-save"></i> Sao lưu JSON</button>
      </div>
    </div>
  </div>

  <div class="glass-panel" style="padding: 1.5rem">
    <h3 style="font-size: 0.95rem; margin-bottom: 1.5rem"><i class="fas fa-clipboard-list" style="color: var(--success); margin-right: 0.5rem"></i>Nhật ký Sync (${n.length})</h3>
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-height: 400px; overflow-y: auto">
      ${n.length>0?n.slice().reverse().map(o=>`
                <div style="display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.4rem 0; border-bottom: 1px solid var(--border)">
                   <div style="width: 8px; height: 8px; background: ${r[o.type]||"var(--text-dim)"}; border-radius: 50%; margin-top: 0.4rem; flex-shrink: 0"></div>
                   <div style="flex: 1">
                      <div style="font-size: 0.8rem; font-weight: 600">${o.message}</div>
                      ${o.detail?`<div style="font-size: 0.85rem; color: var(--text-dim); word-break: break-all">${o.detail}</div>`:""}
                      <span style="font-size: 0.72rem; color: var(--text-dim)">${o.timestamp}</span>
                   </div>
                </div>
             `).join(""):'<div style="font-size: 0.85rem; color: var(--text-dim); text-align: center; padding: 2rem">Chưa có sync log nào. Bấm "Sync NAS + Drive" để bắt đầu.</div>'}
    </div>
  </div>
</div>
`,e}function Ya(t){const e=document.createElement("div"),n=t.modal.data,[i,r]=(n||"").split("-").map(Number),o=n?`Tháng ${r}/${i}`:"Tháng hiện tại",s=t.jobs.filter(y=>{if(y.isTrash)return!1;const x=new Date(y.date);return x.getMonth()+1===(r||t.currentMonth)&&x.getFullYear()===(i||t.currentYear)}),a=t.financeMetadata?.[n]||{ads:0,office:0},l=t.settings?.taxRate??.1,d=s.reduce((y,x)=>y+(x.package||0),0),p=s.reduce((y,x)=>y+x.services.reduce((T,$)=>T+($.cost||0),0),0),c=s.reduce((y,x)=>y+x.services.reduce((T,$)=>T+($.edit||0),0),0),f=a.ads||0,u=a.office||0,h=d-p-c-f-u,v=Math.round(h>0?h*l:0),g=h-v,_=y=>new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(y),b=[["Doanh thu",d,"var(--success)"],["Chi phí thợ",-p,"var(--danger)"],["Chi phí edit",-c,"var(--accent-orange)"],["Ads / Marketing",-f,"var(--text-dim)"],["Văn phòng",-u,"var(--text-dim)"],["Lợi nhuận gộp",h,h>=0?"var(--success)":"var(--danger)"],[`Thuế ${Math.round(l*100)}%`,-v,"var(--warning)"],["Lợi nhuận ròng",g,g>=0?"var(--success)":"var(--danger)"]];return e.innerHTML=`
    <div class="modal-header">
      <h2>📊 Báo cáo PA3 — ${o}</h2>
      <button class="close-btn" onclick="window.closeModal()">&times;</button>
    </div>
    <div class="modal-body" style="overflow-y:auto; padding: 0.5rem">
      <div style="display:grid;grid-template-columns: repeat(3, 1fr);gap: 0.75rem;margin-bottom:1rem">
        <div class="glass-panel" style="padding: 0.75rem;border-top:3px solid var(--success)">
          <div style="font-size:0.6rem;text-transform:uppercase;color:var(--text-dim);font-weight:700">Doanh thu</div>
          <div style="font-size:1.2rem;font-weight:900;color:var(--success)">${_(d)}</div>
          <div style="font-size:0.7rem;color:var(--text-dim)">${s.length} dự án</div>
        </div>
        <div class="glass-panel" style="padding: 0.75rem;border-top:3px solid var(--danger)">
          <div style="font-size:0.6rem;text-transform:uppercase;color:var(--text-dim);font-weight:700">Tổng chi phí</div>
          <div style="font-size:1.2rem;font-weight:900;color:var(--danger)">-${_(p+c+f+u)}</div>
        </div>
        <div class="glass-panel" style="padding: 0.75rem;border-top:3px solid ${g>=0?"var(--success)":"var(--danger)"}">
          <div style="font-size:0.6rem;text-transform:uppercase;color:var(--text-dim);font-weight:700">Lãi sau thuế</div>
          <div style="font-size:1.2rem;font-weight:900;color:${g>=0?"var(--success)":"var(--danger)"}">${_(g)}</div>
        </div>
      </div>
      <div class="glass-panel" style="padding: 0.75rem;margin-bottom:1rem">
        ${b.map(([y,x,T])=>`
          <div style="display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:1px solid var(--border);font-size:0.85rem">
            <span style="color:var(--text-dim)">${y}</span>
            <span style="font-weight:700;color:${T}">${_(x)}</span>
          </div>`).join("")}
      </div>
      <div style="margin-top:1rem;display:flex;justify-content:flex-end;gap:0.5rem">
        <button class="btn btn-secondary" onclick="window.closeModal()">Đóng</button>
        <button class="btn btn-primary" onclick="window.exportCSV()"><i class="fas fa-file-export"></i> Xuất CSV</button>
      </div>
    </div>
  `,e}function Wa(t){const e=t.services||[],n=t.eventDays||[];if(e.length===0)return"";const i=(o,s=!1)=>{const l=o.slice(0,s?o.length:3).map(function(c,f){const u=e.indexOf(c);var h=c.paid,v=cn(c.staff).split(" ")[0]+" - "+(Array.isArray(c.service)?c.service.join(", "):c.service||""),g=h?"rgba(21,128,61,0.10)":"rgba(0,0,0,0.035)",_=h?"#15803d":"#3d6b40",b=h?"rgba(21,128,61,0.22)":"rgba(20,83,45,0.10)",y=h?"✓ ":"",x=h?"Đã thanh toán — click để bỏ":"Chưa thanh toán — click để đánh dấu";return`<span onclick="event.stopPropagation();window.toggleServicePaid('`+t.id+"',"+u+","+!h+',this)" style="display:inline-flex;align-items:center;gap:0.2rem;cursor:pointer;padding:0.2rem 0.55rem;border-radius:20px;font-size:0.78rem;font-weight:700;background:'+g+";color:"+_+";border:1px solid "+b+';transition:all 0.15s" title="'+x+'">'+y+v+"</span>"}).join(" "),d=o.length-3,p=!s&&d>0?' <span style="display:inline-flex;align-items:center;padding:0.2rem 0.55rem;border-radius:20px;font-size:0.72rem;font-weight:800;background:var(--accent-soft);color:var(--primary);border:1px solid var(--border-bright);cursor:default" title="'+o.slice(3).map(c=>cn(c.staff).split(" ")[0]+" - "+(Array.isArray(c.service)?c.service.join(", "):c.service||"")).join(", ")+'">+'+d+" nữa</span>":"";return l+p};return n.length<=1?i(e):n.map((o,s)=>{const a=o.date||t.date,l=e.filter(d=>d.date===a||!d.date&&s===0);return l.length===0?"":`
      <div style="margin-bottom: 0.4rem;">
        <div style="font-size: 0.65rem; color: var(--primary); font-weight: 800; text-transform: uppercase; margin-bottom: 0.2rem;">
          📅 Ngày ${new Date(a).toLocaleDateString("vi-VN")}
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
          ${i(l,!0)}
        </div>
      </div>
    `}).filter(o=>o!=="").join("")||i(e)}function Mo(t){const e=document.createElement("div");e.className="view-container reveal";let n=t.clients||[];if(n.length===0&&t.jobs.length>0){const s=new Map;t.jobs.forEach(a=>{if(!a.isTrash&&!s.has(a.client)){const l="CUST-"+btoa(encodeURIComponent(a.client)).replace(/=/g,"").substring(0,12);s.set(a.client,{id:l,name:a.client,phone:a.phone||"",jobs:[]})}}),n=Array.from(s.values()),t.clients=n,window.saveState&&window.saveState()}let r=n.map(s=>{const a=t.jobs.filter(p=>p.client===s.name&&!p.isTrash),l=a.reduce((p,c)=>p+(c.package||0),0),d=a.reduce((p,c)=>p+(c.deposit||0),0);return{...s,history:a,totalRevenue:l,totalPaid:d,debt:l-d}});if(t.searchQuery){const s=t.searchQuery.toLowerCase();r=r.filter(a=>a.name.toLowerCase().includes(s)||(a.phone||"").includes(s))}let o="";try{if(t.settings.firebaseConfig){const s=JSON.parse(t.settings.firebaseConfig);if(s.databaseURL){const a=new URL(s.databaseURL);o="&db="+encodeURIComponent(a.hostname)}}}catch{}return e.innerHTML=`
    <header class="section-header">
       <div>
         <h1 class="view-title">🧑‍🤝‍🧑 Danh bạ Khách hàng</h1>
         <p style="font-size: 0.85rem; color: var(--text-dim); margin-top: 0.2rem">Quản lý Khách hàng và link Tra cứu (Customer Portal)</p>
       </div>
       <div style="display: flex; gap: 0.5rem; align-items: center">
         <input type="text" placeholder="Tìm tên, SĐT…" value="${t.searchQuery||""}"
           onchange="window.setSearchQuery(this.value)"
           style="background: #fff; border: 1.5px solid var(--border); color: var(--text-main); padding: 0.4rem 0.75rem; border-radius: 8px; font-size: 0.85rem; width: 220px">
         <button class="btn btn-primary" onclick="window.addClientPrompt()"><i class="fas fa-plus"></i> Khách Mới</button>
       </div>
    </header>

    <div class="glass-panel" style="margin-top: 1.5rem; padding: 1rem; border-radius: 12px; overflow: hidden">
      <table class="data-table">
        <thead>
          <tr>
            <th>Khách hàng</th>
            <th>Liên hệ</th>
            <th style="text-align: right">Doanh số</th>
            <th style="text-align: right">Còn nợ</th>
            <th style="text-align: right">Dự án</th>
            <th style="text-align: center">Customer Portal</th>
            <th style="text-align: right">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          ${r.map(s=>{const a=s.history.map(p=>[p.eventType||"Chụp Ảnh/Quay Phim",p.date,p.status,p.package||0,p.deposit||0,p.venue||"",p.services?p.services.map(c=>c.service).join("|"):"",p.linkCustomer||"",p.linkDrive||""]),l=encodeURIComponent(JSON.stringify(a)),d=window.location.origin+"/portal.html?cid="+s.id+o+"&name="+encodeURIComponent(s.name)+"&d="+l;return`
             <tr>
               <td data-label="Khách hàng" style="font-weight: 800; font-size: 0.95rem; color: var(--text-main)">${s.name}</td>
               <td data-label="Liên hệ">
                  <div style="display: flex; align-items: center; gap: 0.4rem; justify-content: flex-end">
                    <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted)">${s.phone||'<em style="opacity:0.5">Trống</em>'}</span>
                    ${s.phone?`<a href="https://zalo.me/${s.phone}" target="_blank" title="Zalo" style="color: #0084ff; font-size: 0.85rem"><i class="fas fa-comment-dots"></i></a>`:""}
                  </div>
               </td>
               <td data-label="Doanh số" style="text-align: right; font-weight: 700; color: var(--success); font-size: 0.9rem">${D(s.totalRevenue)}</td>
               <td data-label="Còn nợ" style="text-align: right; font-weight: 800; color: ${s.debt>0?"var(--danger)":"var(--text-dim)"}; font-size: 0.9rem">${D(s.debt)}</td>
               <td data-label="Dự án" style="text-align: right">
                  <span class="badge" style="background: rgba(59,130,246,0.1); color: #3b82f6">${s.history.length} Jobs</span>
               </td>
               <td data-label="Customer Portal" style="text-align: center">
                  <div style="display: flex; justify-content: center; gap: 0.3rem">
                     <button class="btn btn-sm btn-secondary" style="font-size: 0.65rem; padding: 0.2rem 0.4rem; background: rgba(22,163,74,0.08); color: var(--success); border-color: rgba(22,163,74,0.2)" onclick="window.open('${d}', '_blank')"><i class="fas fa-external-link-alt"></i> Mở</button>
                     <button class="btn btn-sm btn-secondary" style="font-size: 0.65rem; padding: 0.2rem 0.4rem" onclick="navigator.clipboard.writeText('${d}'); alert('Đã copy link Portal của khách hàng này!')" title="Copy cho khách"><i class="fas fa-copy"></i> Copy</button>
                  </div>
               </td>
               <td data-label="Thao tác" style="text-align: right">
                 <button class="btn btn-secondary btn-sm" style="padding: 0.3rem 0.5rem; font-size: 0.65rem" onclick="window.editClientPrompt('${s.id}')" title="Sửa"><i class="fas fa-pen"></i></button>
                 <button class="btn btn-secondary btn-sm" style="padding: 0.3rem 0.5rem; font-size: 0.65rem; color: var(--danger)" onclick="if(confirm('Xóa thông tin khách hàng này?\\n\\nChú ý: Hành động này KHÔNG xóa các Dự án liên quan.')) window.removeClient('${s.id}')" title="Xóa"><i class="fas fa-trash"></i></button>
               </td>
             </tr>
             `}).join("")}
          ${r.length===0?'<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-dim)">Chưa có dữ liệu khách hàng</td></tr>':""}
        </tbody>
      </table>
    </div>
  `,e}function Ho(){const t=document.createElement("div");t.style.cssText=`
    width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 40%, #a5d6a7 100%);
    background-image: radial-gradient(ellipse at 30% 20%, rgba(22,163,74,0.15) 0%, transparent 50%),
                      radial-gradient(ellipse at 70% 80%, rgba(34,197,94,0.1) 0%, transparent 50%);
    font-family: 'Outfit', sans-serif;
  `;let e="",n="",i=!1;try{const r=JSON.parse(localStorage.getItem("haru_remember")||"{}");r.remember&&(e=r.username||"",n=r.password||"",i=!0)}catch{}return t.innerHTML=`
    <div style="width: 400px; max-width: 92vw; background: rgba(255,255,255,0.85); backdrop-filter: blur(20px);
      border: 1.5px solid rgba(22,163,74,0.2); border-radius: 24px; padding: 2.5rem;
      box-shadow: 0 24px 80px rgba(0,60,0,0.12); text-align: center">

      <div style="margin: 0 auto 1.2rem; display:flex; justify-content:center; align-items:center;">
        <img src="/haru-job-logo.png" alt="Haru Job" style="width: 110px; max-width: 60%; height: auto; object-fit: contain" />
      </div>

      <h1 style="font-size: 1.6rem; font-weight: 900; color: #0f1f0f; margin-bottom: 0.3rem; letter-spacing: -0.5px">HARU JOB</h1>
      <p style="font-size: 0.85rem; color: #3d6b40; margin-bottom: 2rem">Đăng nhập để tiếp tục</p>

      <div id="login-error" style="display: none; background: #fef2f2; border: 1px solid #fca5a5;
        border-radius: 10px; padding: 0.6rem 1rem; margin-bottom: 1rem; color: #b91c1c; font-size: 0.85rem; font-weight: 600">
        Sai tài khoản hoặc mật khẩu
      </div>

      <form id="login-form" style="display: flex; flex-direction: column; gap: 1rem">
        <div style="text-align: left">
          <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #3d6b40; letter-spacing: 0.5px; display: block; margin-bottom: 0.4rem">Tài khoản</label>
          <input type="text" id="login-username" placeholder="username" required autocomplete="username"
            value="${e}"
            style="width: 100%; padding: 0.75rem 1rem; border: 1.5px solid rgba(20,83,45,0.15); border-radius: 12px;
              font-size: 1rem; font-family: inherit; background: #fff; color: #0f1f0f; outline: none;
              transition: border-color 0.2s; box-sizing: border-box"
            onfocus="this.style.borderColor='#22c55e'; this.style.boxShadow='0 0 0 3px rgba(34,197,94,0.12)'"
            onblur="this.style.borderColor='rgba(20,83,45,0.15)'; this.style.boxShadow='none'">
        </div>
        <div style="text-align: left">
          <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #3d6b40; letter-spacing: 0.5px; display: block; margin-bottom: 0.4rem">Mật khẩu / Mã PIN</label>
          <div style="position: relative">
            <input type="password" inputmode="numeric" pattern="[0-9]*" id="login-password" placeholder="••••" required autocomplete="current-password"
              value="${n}"
              style="width: 100%; padding: 0.75rem 2.5rem 0.75rem 1rem; border: 1.5px solid rgba(20,83,45,0.15); border-radius: 12px;
                font-size: 1.25rem; letter-spacing: 4px; font-weight: 800; font-family: inherit; background: #fff; color: #0f1f0f; outline: none; text-align: center;
                transition: border-color 0.2s; box-sizing: border-box"
              onfocus="this.style.borderColor='#22c55e'; this.style.boxShadow='0 0 0 3px rgba(34,197,94,0.12)'"
              onblur="this.style.borderColor='rgba(20,83,45,0.15)'; this.style.boxShadow='none'">
            <button type="button" id="toggle-pw-btn" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
              background: none; border: none; cursor: pointer; font-size: 1.1rem; color: #6b8f6e; padding: 0.2rem" title="Hiện/ẩn mật khẩu">👁</button>
          </div>
          <div style="text-align:center; font-size:0.7rem; color:#6b8f6e; margin-top:0.4rem; font-weight:600">Nhập 4 số PIN để vào ngay</div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0 0.2rem">
          <input type="checkbox" id="login-remember" ${i?"checked":""}
            style="accent-color: #22c55e; width: 16px; height: 16px; cursor: pointer">
          <label for="login-remember" style="font-size: 0.82rem; color: #3d6b40; font-weight: 600; cursor: pointer">Ghi nhớ đăng nhập</label>
        </div>
        <button type="submit" style="width: 100%; padding: 0.85rem; background: linear-gradient(135deg, #16a34a, #15803d);
          color: #fff; border: none; border-radius: 12px; font-size: 1rem; font-weight: 800; font-family: inherit;
          cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 16px rgba(22,163,74,0.3)"
          onmouseenter="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 6px 24px rgba(22,163,74,0.4)'"
          onmouseleave="this.style.transform='none'; this.style.boxShadow='0 4px 16px rgba(22,163,74,0.3)'">
          Đăng nhập →
        </button>
      </form>

      <button type="button" id="pwa-install-btn" style="display: none; width: 100%; margin-top: 1.25rem; padding: 0.75rem; background: #fff; color: #16a34a; border: 2px solid #16a34a; border-radius: 12px; font-size: 0.95rem; font-weight: 800; font-family: inherit; cursor: pointer; transition: all 0.2s;"
        onmouseenter="this.style.background='#16a34a'; this.style.color='#fff'"
        onmouseleave="this.style.background='#fff'; this.style.color='#16a34a'">
        📱 Cài đặt Ứng dụng về máy
      </button>

      <p style="font-size: 0.72rem; color: #6b8f6e; margin-top: 1.5rem">Haru Wedding Film © 2026</p>
    </div>
  `,setTimeout(()=>{const r=t.querySelector("#pwa-install-btn");r&&window.deferredPrompt&&(r.style.display="block"),r&&(r.onclick=async()=>{if(!window.deferredPrompt)return;window.deferredPrompt.prompt();const{outcome:l}=await window.deferredPrompt.userChoice;l==="accepted"&&(r.style.display="none"),window.deferredPrompt=null});const o=t.querySelector("#toggle-pw-btn"),s=t.querySelector("#login-password");o&&s&&(o.onclick=()=>{s.type==="password"?(s.type="text",o.textContent="🙈"):(s.type="password",o.textContent="👁")});const a=t.querySelector("#login-form");a&&(a.onsubmit=l=>{l.preventDefault();const d=document.getElementById("login-username").value.trim(),p=document.getElementById("login-password").value;if(document.getElementById("login-remember").checked?localStorage.setItem("haru_remember",JSON.stringify({remember:!0,username:d,password:p})):localStorage.removeItem("haru_remember"),!window.login(d,p)){const u=document.getElementById("login-error");u&&(u.style.display="block")}})},0),t}function Ro(t){const e=document.createElement("div");e.style.cssText="min-height:100vh; background:var(--bg-deep); font-family:'Outfit',sans-serif;";const n=new Date;n.setHours(0,0,0,0);const i=20,r=t.currentUser?.displayName||"Editor",o=["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"],s=["Chưa bắt đầu","Đang cắt","Demo 1","Chỉnh sửa","Hoàn thành"],a=["⏳","✂️","📺","🔧","✅"],l=["#94a3b8","#3b82f6","#f97316","#eab308","#22c55e"],d=t.currentMonth,p=t.currentYear,c=t.prevMonth||(d===1?12:d-1),f=t.prevYear||(d===1?p-1:p),u=`${o[c-1]} & ${o[d-1]} ${p}`,h={};t.jobs.forEach(w=>{if(w.isTrash)return;const k=[];if(w.services.forEach((A,le)=>{if(!(Array.isArray(A.service)?A.service.join(" "):A.service||"").toLowerCase().includes("quay"))return;const ee=new Date(w.date);ee.setHours(0,0,0,0);const te=new Date(ee);te.setDate(te.getDate()+i);const Ce=Math.ceil((te-n)/864e5),lt=A.editStatus||"Chưa bắt đầu";let Ne,Je,Q,fe;lt==="Hoàn thành"?(Ne="XONG",Je="#22c55e",Q="✅",fe=99):Ce>10?(Ne="OK",Je="#22c55e",Q="🟢",fe=3):Ce>5?(Ne="SẮP",Je="#eab308",Q="🟡",fe=2):Ce>0?(Ne="GẤP",Je="#f97316",Q="🟠",fe=1):(Ne="TRỄ",Je="#ef4444",Q="🔴",fe=0);const on=A.editChecklist||{footage:!1,rough:!1,color:!1,audio:!1,export:!1};k.push({svc:A.service,sIdx:le,staff:A.staff,editStaff:A.editStaff||"",es:lt,editDriveLink:A.editDriveLink||"",editorNote:A.editorNote||"",dlStr:te.toLocaleDateString("vi-VN"),dateStr:ee.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"}),daysLeft:Ce,stg:Ne,sc:Je,si:Q,pri:fe,cl:on,jobMonth:ee.getMonth()+1})}),!k.length)return;const z=Math.min(...k.map(A=>A.pri)),E=k.find(A=>A.pri===z)?.sc||"#22c55e";let O="";w.timeline?.le&&(O+=`Lễ: ${w.timeline.le}`),w.timeline?.tiec&&(O+=`${O?" · ":""}Tiệc: ${w.timeline.tiec}`);const Z=new Date(w.date);h[w.id]={id:w.id,no:w.jobNo,client:w.client,type:w.eventType||"Wedding",date:w.date,tl:O,notes:w.notes||"",lNAS:w.linkNAS||"",lFt:w.linkFootage||"",clips:k,cn:k.length,dn:k.filter(A=>A.es==="Hoàn thành").length,ad:k.every(A=>A.es==="Hoàn thành"),wp:z,wc:E,wdl:Math.min(...k.map(A=>A.daysLeft)),jobMonth:Z.getMonth()+1}});const v=Object.values(h).sort((w,k)=>w.wp-k.wp||w.wdl-k.wdl),g=v.flatMap(w=>w.clips),_=g.length,b=g.filter(w=>w.es==="Hoàn thành").length,y=g.filter(w=>w.pri<=1).length,x=_-b,T=_>0?Math.round(b/_*100):0,$=v.filter(w=>w.jobMonth===c),I=v.filter(w=>w.jobMonth===d);function B(w,k){const z=w.es==="Hoàn thành",E=Object.values(w.cl).filter(Boolean).length,O=s.indexOf(w.es),Z=[["footage","📁","Footage"],["rough","✂️","Cut"],["color","🎨","Color"],["audio","🎵","Audio"],["export","📤","Export"]];return`
      <div style="background:${w.sc}04;border:1px solid ${w.sc}15;border-radius:10px;padding:0.6rem 0.75rem;margin-bottom:0.4rem;${z?"opacity:0.55":""}">
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.35rem;flex-wrap:wrap">
          <div style="min-width:38px;text-align:center">
            <span style="font-size:1rem">${w.si}</span>
            <div style="font-size:0.55rem;font-weight:900;color:${w.sc};letter-spacing:0.5px">${w.stg}</div>
          </div>
          <div style="flex:1;min-width:120px">
            <div style="display:flex;align-items:center;gap:0.4rem">
              <span style="font-size:0.85rem;font-weight:800;color:var(--text-main)">${w.svc}</span>
              <span style="font-size:0.6rem;color:var(--text-dim);background:#0001;padding:0.1rem 0.3rem;border-radius:3px">📅 ${w.dateStr}</span>
            </div>
            <div style="display:flex;align-items:center;gap:0.4rem;margin-top:0.15rem">
              <span style="font-size:0.7rem;color:var(--text-dim)">📷 <b>${w.staff}</b></span>
              <span style="font-size:0.65rem;color:${w.sc};font-weight:800;font-family:monospace;background:${w.sc}10;padding:0.1rem 0.3rem;border-radius:4px">
                ⏰ ${z?"Đã xong":w.daysLeft>0?w.daysLeft+" ngày còn":"Trễ "+Math.abs(w.daysLeft)+" ngày"}
              </span>
              <span style="font-size:0.6rem;color:var(--text-dim)">→ DL: ${w.dlStr}</span>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:0.4rem">
            <div style="text-align:center">
              <div style="font-size:0.55rem;color:var(--text-dim);font-weight:700;margin-bottom:0.1rem">Editor</div>
              <select class="form-control ep-editor-select" data-job-id="${k.id}" data-service="${w.svc}"
                style="width:90px;font-size:0.75rem;padding:0.25rem 0.3rem;border:1px solid var(--border);border-radius:6px;font-weight:700">
                <option value="">— Chọn —</option>
                ${t.staff.map(A=>`<option value="${A.name}" ${w.editStaff===A.name?"selected":""}>${A.name}</option>`).join("")}
              </select>
            </div>
            <div style="text-align:center">
              <div style="font-size:0.55rem;color:var(--text-dim);font-weight:700;margin-bottom:0.1rem">Trạng thái</div>
              <select class="form-control ep-status-select" data-job-id="${k.id}" data-service="${w.svc}"
                style="width:105px;font-size:0.75rem;padding:0.25rem 0.3rem;border:1px solid ${w.sc}30;border-radius:6px;font-weight:800;color:${w.sc}">
                ${s.map(A=>`<option value="${A}" ${w.es===A?"selected":""}>${A}</option>`).join("")}
              </select>
            </div>
            ${z?`<button class="ep-reopen-btn" data-job-id="${k.id}" data-service="${w.svc}"
              style="background:#f97316;color:#fff;border:none;padding:0.3rem 0.6rem;border-radius:6px;
                font-size:0.7rem;font-weight:800;cursor:pointer;font-family:inherit;white-space:nowrap;margin-top:0.8rem">✏️ Edit lại</button>`:`<button class="ep-done-btn" data-job-id="${k.id}" data-service="${w.svc}"
              style="background:#22c55e;color:#fff;border:none;padding:0.3rem 0.6rem;border-radius:6px;
                font-size:0.7rem;font-weight:800;cursor:pointer;font-family:inherit;white-space:nowrap;margin-top:0.8rem">✓ Xong</button>`}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.35rem;padding-left:42px">
          <div style="display:flex;gap:0.25rem;flex:1">
            ${Z.map(([A,le,ee])=>`
              <label style="cursor:pointer;display:flex;align-items:center;gap:0.15rem;font-size:0.72rem;
                padding:0.15rem 0.35rem;border-radius:5px;background:${w.cl[A]?"#22c55e12":"#0001"};
                border:1px solid ${w.cl[A]?"#22c55e30":"transparent"};transition:all 0.15s" title="${ee}">
                <input type="checkbox" class="ep-checklist" data-job-id="${k.id}" data-service="${w.svc}" data-key="${A}"
                  ${w.cl[A]?"checked":""} style="display:none">
                <span style="opacity:${w.cl[A]?1:.4}">${le}</span>
                <span style="font-size:0.6rem;font-weight:700;color:${w.cl[A]?"#22c55e":"var(--text-dim)"}">${ee}</span>
              </label>`).join("")}
          </div>
          <div style="display:flex;align-items:center;gap:0.3rem;min-width:70px">
            <div style="flex:1;height:4px;background:#0001;border-radius:2px">
              <div style="width:${E*20}%;height:100%;background:${E===5?"#22c55e":"#3b82f6"};border-radius:2px"></div>
            </div>
            <span style="font-size:0.65rem;font-weight:800;color:${E===5?"#22c55e":"var(--text-dim)"}">${E}/5</span>
          </div>
          <div style="display:flex;gap:2px;min-width:45px">
            ${s.map((A,le)=>`<div style="flex:1;height:4px;background:${le<O?"#22c55e":le===O?w.sc:"#e2e8f0"};border-radius:2px"></div>`).join("")}
          </div>
        </div>
        <div style="display:flex;gap:0.4rem;padding-left:42px">
          <div style="flex:1;display:flex;align-items:center;gap:0.25rem">
            <span style="font-size:0.65rem;font-weight:800;color:var(--text-dim)">🔗 Output</span>
            <input type="text" class="form-control ep-drive-input" data-job-id="${k.id}" data-service="${w.svc}"
              placeholder="Link sản phẩm…" value="${w.editDriveLink}"
              style="flex:1;font-size:0.75rem;padding:0.25rem 0.4rem;border:1px solid var(--border);border-radius:6px;background:#fff">
            ${w.editDriveLink?`<a href="${w.editDriveLink}" target="_blank" style="font-size:0.65rem;color:#22c55e;font-weight:800;text-decoration:none">Mở ↗</a>`:""}
          </div>
          <div style="flex:1;display:flex;align-items:center;gap:0.25rem">
            <span style="font-size:0.65rem;font-weight:800;color:var(--text-dim)">✏️ Note</span>
            <input type="text" class="form-control ep-note-input" data-job-id="${k.id}" data-service="${w.svc}"
              placeholder="Ghi chú cho editor…" value="${w.editorNote}"
              style="flex:1;font-size:0.75rem;padding:0.25rem 0.4rem;border:1px solid var(--border);border-radius:6px;background:#fff;color:var(--text-muted)">
          </div>
        </div>
      </div>`}function P(w){const k=w.cn>0?Math.round(w.dn/w.cn*100):0;return`
    <div style="background:${w.ad?"#22c55e06":"#fff"};border:1px solid ${w.wc}20;border-radius:14px;
      padding:0.85rem 1rem;margin-bottom:0.7rem;${w.ad?"opacity:0.6":""}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem">
        <div style="display:flex;align-items:center;gap:0.6rem">
          <div style="width:36px;height:36px;background:${w.wc}15;border-radius:10px;display:flex;align-items:center;
            justify-content:center;font-weight:900;color:${w.wc};font-size:0.95rem">${w.client[0]}</div>
          <div>
            <div style="font-size:1rem;font-weight:800;color:var(--text-main)">${w.client}</div>
            <div style="font-size:0.72rem;color:var(--text-dim)">${w.type} · ${new Date(w.date).toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit",year:"numeric"})}${w.tl?" · "+w.tl:""}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:0.6rem">
          <span style="font-size:0.65rem;font-weight:800;color:var(--primary);background:var(--accent-soft);padding:0.15rem 0.5rem;border-radius:5px">#${w.no||"—"}</span>
          <div style="text-align:right">
            <div style="font-size:0.7rem;font-weight:800;color:${w.wc}">${w.cn} clip · ${k}%</div>
            <div style="width:60px;height:4px;background:#0001;border-radius:2px;margin-top:0.2rem">
              <div style="width:${k}%;height:100%;background:${k===100?"#22c55e":w.wc};border-radius:2px"></div>
            </div>
          </div>
        </div>
      </div>
      ${w.notes?`<div style="background:#eab30808;border:1px solid #eab30815;border-radius:8px;padding:0.35rem 0.6rem;margin-bottom:0.5rem;font-size:0.75rem">
        <b style="color:#eab308">📝 Ghi chú:</b> <span style="color:var(--text-muted)">${w.notes}</span></div>`:""}
      <div style="display:flex;gap:0.5rem;margin-bottom:0.5rem">
        <div style="flex:1;display:flex;align-items:center;gap:0.3rem">
          <span style="font-size:0.65rem;font-weight:800;color:var(--text-dim)">📂 Footage</span>
          <input type="text" class="form-control ep-footage-input" data-job-id="${w.id}" placeholder="Link footage nguồn…" value="${w.lFt}"
            style="flex:1;font-size:0.75rem;padding:0.25rem 0.5rem;border:1px solid var(--border);border-radius:6px;background:#fff">
          ${w.lFt?`<a href="${w.lFt}" target="_blank" style="font-size:0.65rem;color:#2563eb;font-weight:800;text-decoration:none">Mở ↗</a>`:""}
        </div>
        <div style="flex:1;display:flex;align-items:center;gap:0.3rem">
          <span style="font-size:0.65rem;font-weight:800;color:var(--text-dim)">📁 NAS</span>
          <input type="text" class="form-control ep-nas-input" data-job-id="${w.id}" placeholder="Link NAS video…" value="${w.lNAS}"
            style="flex:1;font-size:0.75rem;padding:0.25rem 0.5rem;border:1px solid var(--border);border-radius:6px;background:#fff">
          ${w.lNAS?`<a href="${w.lNAS}" target="_blank" style="font-size:0.65rem;color:#2563eb;font-weight:800;text-decoration:none">Mở ↗</a>`:""}
        </div>
      </div>
      ${w.clips.map(z=>B(z,w)).join("")}
    </div>`}function X(w,k){if(!k.length)return"";const z=k.flatMap(Z=>Z.clips),E=z.filter(Z=>Z.es==="Hoàn thành").length,O=z.length>0?Math.round(E/z.length*100):0;return`
    <div style="margin-bottom:1rem">
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;padding:0.4rem 0;border-bottom:2px solid rgba(22,163,74,0.15)">
        <span style="font-size:0.95rem;font-weight:900;color:var(--text-main)">${w}</span>
        <span style="font-size:0.72rem;font-weight:700;color:var(--text-dim)">${z.length} clip · ${k.length} khách</span>
        <div style="flex:1"></div>
        <div style="display:flex;align-items:center;gap:0.3rem">
          <div style="width:80px;height:5px;background:#0001;border-radius:3px">
            <div style="width:${O}%;height:100%;background:${O===100?"#22c55e":"var(--primary)"};border-radius:3px"></div>
          </div>
          <span style="font-size:0.72rem;font-weight:800;color:${O===100?"#22c55e":"var(--primary)"}">${O}%</span>
        </div>
      </div>
      ${k.map(Z=>P(Z)).join("")}
    </div>`}function ie(){return`
    <div style="display:flex;gap:0.5rem;overflow-x:auto;padding-bottom:1rem;min-height:500px">
      ${s.map((w,k)=>{const z=g.filter(E=>E.es===w);return`
        <div style="flex:1;min-width:220px;background:var(--bg-card);border-radius:12px;padding:0.6rem;border:1px solid var(--border)">
          <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.6rem;padding-bottom:0.4rem;border-bottom:2px solid ${l[k]}">
            <span>${a[k]}</span>
            <span style="font-size:0.75rem;font-weight:800;color:${l[k]}">${w}</span>
            <span style="font-size:0.6rem;background:${l[k]}20;color:${l[k]};padding:0.1rem 0.35rem;border-radius:8px;font-weight:800;margin-left:auto">${z.length}</span>
          </div>
          <div class="ep-kanban-list" data-status="${w}" style="min-height:50px;display:flex;flex-direction:column;gap:0.4rem">
            ${z.map(E=>{const O=Object.values(h).find(te=>te.clips.includes(E));if(!O)return"";const A=(t.jobs.find(te=>te.id===O.id)?.comments||[]).filter(te=>!te.service||te.service===E.svc),le=E.es==="Hoàn thành",ee=Object.values(E.cl).filter(Boolean).length;return`
              <div class="ep-kanban-card" data-job-id="${O.id}" data-svc="${E.svc}"
                style="background:var(--bg-main);border:1px solid ${E.sc}25;border-radius:10px;padding:0.55rem;cursor:grab;transition:all 0.15s;border-left:3px solid ${E.sc};${le?"opacity:0.55":""}">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.25rem">
                  <span style="font-size:0.82rem;font-weight:800;color:var(--text-main)">${O.client}</span>
                  <span style="font-size:0.85rem">${E.si}</span>
                </div>
                <div style="font-size:0.68rem;color:var(--text-dim);margin-bottom:0.2rem">${E.svc} · 📅 ${E.dateStr}</div>
                <div style="display:flex;justify-content:space-between;font-size:0.6rem;color:var(--text-muted);margin-bottom:0.25rem">
                  <span>📷 ${E.staff}</span>
                  <span>✏️ ${E.editStaff||"—"}</span>
                </div>
                <div style="font-size:0.6rem;font-weight:800;color:${E.sc};background:${E.sc}10;padding:0.15rem 0.3rem;border-radius:4px;text-align:center;margin-bottom:0.3rem">
                  ⏰ ${le?"Đã xong":E.daysLeft>0?E.daysLeft+" ngày còn":"TRỄ "+Math.abs(E.daysLeft)+" ngày!"}
                </div>
                <div style="display:flex;align-items:center;gap:0.2rem;margin-bottom:0.3rem">
                  <div style="flex:1;height:3px;background:#0001;border-radius:2px"><div style="width:${ee*20}%;height:100%;background:${ee===5?"#22c55e":"#3b82f6"};border-radius:2px"></div></div>
                  <span style="font-size:0.55rem;font-weight:800;color:${ee===5?"#22c55e":"var(--text-dim)"}">${ee}/5</span>
                </div>
                ${O.notes?`<div style="background:#eab30808;border:1px solid #eab30815;border-radius:6px;padding:0.25rem 0.4rem;margin-bottom:0.25rem;font-size:0.62rem">
                  <b style="color:#eab308">📝</b> <span style="color:var(--text-muted)">${O.notes.substring(0,80)}${O.notes.length>80?"…":""}</span>
                </div>`:""}
                ${E.editorNote?`<div style="background:#3b82f608;border:1px solid #3b82f615;border-radius:6px;padding:0.25rem 0.4rem;margin-bottom:0.25rem;font-size:0.62rem">
                  <b style="color:#3b82f6">✏️</b> <span style="color:var(--text-muted)">${E.editorNote.substring(0,80)}${E.editorNote.length>80?"…":""}</span>
                </div>`:""}
                ${A.length>0?`<div style="background:#22c55e08;border:1px solid #22c55e15;border-radius:6px;padding:0.25rem 0.4rem;font-size:0.58rem">
                  <b style="color:#22c55e">💬 ${A.length} ghi chú</b>
                  ${A.slice(-2).map(te=>`<div style="color:var(--text-muted);margin-top:0.15rem;padding-left:0.3rem;border-left:2px solid #22c55e30">
                    <b>${te.user}</b>: ${te.text.substring(0,60)}${te.text.length>60?"…":""}
                  </div>`).join("")}
                </div>`:""}
                <div style="display:flex;gap:0.2rem;margin-top:0.3rem;justify-content:flex-end">
                  <button class="ep-kanban-chat" data-job-id="${O.id}" style="font-size:0.55rem;background:var(--primary-glow);color:var(--primary);border:1px solid var(--border-bright);padding:0.15rem 0.3rem;border-radius:4px;cursor:pointer;font-weight:700">💬 Chat</button>
                  ${E.editDriveLink?`<a href="${E.editDriveLink}" target="_blank" style="font-size:0.55rem;background:#3b82f610;color:#3b82f6;border:1px solid #3b82f620;padding:0.15rem 0.3rem;border-radius:4px;text-decoration:none;font-weight:700">🔗 Output</a>`:""}
                </div>
              </div>`}).join("")}
          </div>
        </div>`}).join("")}
    </div>`}return e.innerHTML=`
    <div style="background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);border-bottom:1px solid rgba(22,163,74,0.1);
      padding:0.6rem 1.5rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:100">
      <div style="display:flex;align-items:center;gap:0.6rem">
        <div style="width:30px;height:30px;background:linear-gradient(135deg,#16a34a,#22c55e);border-radius:8px;
          display:flex;align-items:center;justify-content:center">
          <span style="color:#fff;font-size:0.75rem;font-weight:900">H</span>
        </div>
        <div>
          <span style="font-size:0.95rem;font-weight:800;color:var(--text-main)">Xin chào, ${r} 👋</span>
          <span style="font-size:0.7rem;color:var(--text-dim);margin-left:0.4rem">${n.toLocaleDateString("vi-VN",{weekday:"long",day:"2-digit",month:"2-digit",year:"numeric"})}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <div style="display:flex;gap:0.2rem;background:var(--accent-soft);border-radius:8px;padding:0.15rem;border:1px solid var(--border)">
          <button class="ep-view-toggle" data-view="list" style="font-size:0.72rem;font-weight:700;padding:0.25rem 0.5rem;border-radius:6px;cursor:pointer;border:none;background:transparent;color:var(--text-dim);font-family:inherit">📋 List</button>
          <button class="ep-view-toggle" data-view="kanban" style="font-size:0.72rem;font-weight:700;padding:0.25rem 0.5rem;border-radius:6px;cursor:pointer;border:none;background:var(--primary);color:#fff;font-family:inherit">📌 Kanban</button>
        </div>
        <div style="display:flex;gap:0.35rem;font-size:0.75rem;font-weight:800">
          <span style="background:#3b82f610;color:#3b82f6;padding:0.2rem 0.5rem;border-radius:6px">${_} clip</span>
          ${y>0?`<span style="background:#ef444410;color:#ef4444;padding:0.2rem 0.5rem;border-radius:6px;animation:pulse 2s infinite">🔥 ${y} gấp</span>`:""}
          <span style="background:#f9731610;color:#f97316;padding:0.2rem 0.5rem;border-radius:6px">${x} chờ</span>
          <span style="background:#22c55e10;color:#22c55e;padding:0.2rem 0.5rem;border-radius:6px">✅ ${b}</span>
        </div>
        <div style="background:var(--accent-soft);padding:0.25rem 0.6rem;border-radius:6px;border:1px solid rgba(22,163,74,0.15)">
          <span style="font-size:0.78rem;font-weight:800;color:var(--primary)">${u}</span>
        </div>
        <button onclick="window.toggleTheme();window.updateUI()" class="theme-toggle">${document.documentElement.getAttribute("data-theme")==="dark"?"☀️":"🌙"}</button>
        <button onclick="window.logout()" style="background:#ef444408;border:1px solid #ef444425;color:#ef4444;
          padding:0.25rem 0.6rem;border-radius:6px;font-size:0.75rem;font-weight:700;cursor:pointer;font-family:inherit">🚪 Thoát</button>
      </div>
    </div>

    <div style="padding:0.85rem 1.5rem;max-width:1400px;margin:0 auto">
      <div style="display:flex;gap:0.35rem;margin-bottom:0.85rem">
        ${s.map((w,k)=>{const z=g.filter(E=>E.es===w).length;return`<div style="flex:1;text-align:center;padding:0.35rem;background:${z>0?l[k]+"10":"#fff"};
            border:1px solid ${z>0?l[k]+"30":"var(--border)"};border-radius:8px">
            <span style="font-size:0.9rem">${a[k]}</span>
            <span style="font-size:0.75rem;font-weight:800;color:${l[k]};margin-left:0.2rem">${z}</span>
            <div style="font-size:0.58rem;color:var(--text-dim);font-weight:700;margin-top:0.1rem">${w}</div>
          </div>`}).join("")}
      </div>

      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.85rem;padding:0.4rem 0.6rem;background:var(--accent-soft);border-radius:8px">
        <span style="font-size:0.75rem;font-weight:800;color:var(--primary)">📊 Tổng tiến độ</span>
        <div style="flex:1;height:6px;background:#0002;border-radius:3px">
          <div style="width:${T}%;height:100%;background:${T===100?"#22c55e":"var(--primary)"};border-radius:3px"></div>
        </div>
        <span style="font-size:0.8rem;font-weight:900;color:${T===100?"#22c55e":"var(--primary)"}">${T}%</span>
        <span style="font-size:0.7rem;color:var(--text-dim)">(${b}/${_})</span>
      </div>

      <!-- LIST VIEW (hidden by default) -->
      <div id="ep-list-view" style="display:none">
        ${X(o[c-1]+" "+f,$)}
        ${X(o[d-1]+" "+p,I)}
        ${v.length===0?'<div style="text-align:center;padding:2.5rem;color:var(--text-dim);background:#fff;border-radius:14px;border:1.5px dashed var(--border)">Không có video nào trong giai đoạn này 🎬</div>':""}
      </div>

      <!-- KANBAN VIEW (shown by default) -->
      <div id="ep-kanban-view">
        ${ie()}
      </div>
    </div>
    <style>@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.7}}</style>
  `,e.addEventListener("change",function(w){const k=w.target;k.classList.contains("ep-status-select")&&window.updateVideoEditStatus(k.dataset.jobId,k.dataset.service,k.value),k.classList.contains("ep-editor-select")&&window.updateVideoEditor(k.dataset.jobId,k.dataset.service,k.value),k.classList.contains("ep-checklist")&&(window.updateEditorChecklist(k.dataset.jobId,k.dataset.service,k.dataset.key,k.checked),window.updateUI())}),e.addEventListener("click",function(w){const k=w.target.closest(".ep-done-btn");k&&window.updateVideoEditStatus(k.dataset.jobId,k.dataset.service,"Hoàn thành");const z=w.target.closest(".ep-reopen-btn");z&&window.updateVideoEditStatus(z.dataset.jobId,z.dataset.service,"Chỉnh sửa");const E=w.target.closest(".ep-view-toggle");if(E){const Z=E.dataset.view,A=e.querySelector("#ep-list-view"),le=e.querySelector("#ep-kanban-view");e.querySelectorAll(".ep-view-toggle").forEach(ee=>{ee.style.background="transparent",ee.style.color="var(--text-dim)"}),E.style.background="var(--primary)",E.style.color="#fff",Z==="list"?(A.style.display="",le.style.display="none"):(A.style.display="none",le.style.display="")}const O=w.target.closest(".ep-kanban-chat");O&&window.openChat&&window.openChat(O.dataset.jobId)}),e.addEventListener("blur",function(w){const k=w.target;k.classList.contains("ep-drive-input")&&window.updateVideoEditLink(k.dataset.jobId,k.dataset.service,k.value),k.classList.contains("ep-note-input")&&window.updateEditorNote(k.dataset.jobId,k.dataset.service,k.value),k.classList.contains("ep-footage-input")&&window.updateJobLink(k.dataset.jobId,"linkFootage",k.value),k.classList.contains("ep-nas-input")&&window.updateJobLink(k.dataset.jobId,"linkNAS",k.value)},!0),e}function Oo(t){const e=document.createElement("div");e.style.cssText="min-height:100vh;background:var(--bg-deep);font-family:'Outfit',sans-serif;";const n=t.currentUser?.staffName||t.currentUser?.displayName||"Nhân sự",i=new Date;i.setHours(0,0,0,0);const r=document.documentElement.getAttribute("data-theme")==="dark",o=[],s=[];t.jobs.forEach(h=>{if(h.isTrash)return;const v=h.services.filter(y=>y.staff===n||y.editStaff===n);if(!v.length)return;const g=new Date(h.date),_=g<i,b=g.toDateString()===i.toDateString();v.forEach(y=>{if(o.push({jobId:h.id,client:h.client,date:h.date,dateStr:g.toLocaleDateString("vi-VN"),eventType:h.eventType||"Lễ cưới",service:y.service,cost:y.cost||0,paid:!!y.paid,isPast:_,isToday:b,status:h.status,address:h.address||h.venue||"",timeline:h.timeline||{}}),(Array.isArray(y.service)?y.service.join(" "):y.service||"").toLowerCase().includes("quay")&&(y.editStaff===n||y.staff===n)){const x=new Date(g);x.setDate(x.getDate()+20);const T=Math.ceil((x-i)/864e5),$=y.editStatus||"Chưa bắt đầu";let I="#22c55e";T<=0&&$!=="Hoàn thành"?I="#ef4444":T<=5?I="#f97316":T<=10&&(I="#eab308"),$==="Hoàn thành"&&(I="#22c55e"),s.push({jobId:h.id,client:h.client,service:y.service,editStatus:$,deadlineStr:x.toLocaleDateString("vi-VN"),daysLeft:T,sc:I,editorNote:y.editorNote||"",editDriveLink:y.editDriveLink||"",dateStr:g.toLocaleDateString("vi-VN")})}})}),o.sort((h,v)=>new Date(h.date)-new Date(v.date));const a=o.reduce((h,v)=>h+v.cost,0),l=o.filter(h=>h.paid).reduce((h,v)=>h+v.cost,0),d=a-l,p=o.filter(h=>!h.isPast),c=o.filter(h=>h.isPast),f=h=>h.toLocaleString("vi-VN")+"đ",u=t.staffPortalTab||"jobs";return e.innerHTML=`
    <div style="background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);border-bottom:1px solid rgba(22,163,74,0.1);padding:0.6rem 1.5rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:100">
      <div style="display:flex;align-items:center;gap:0.6rem">
        <div style="width:36px;height:36px;background:linear-gradient(135deg,#16a34a,#22c55e);border-radius:10px;display:flex;align-items:center;justify-content:center">
          <span style="color:#fff;font-size:0.9rem;font-weight:900">${n[0]}</span>
        </div>
        <div>
          <span style="font-size:1rem;font-weight:800;color:var(--text-main)">👋 ${n}</span>
          <div style="font-size:0.68rem;color:var(--text-dim)">${i.toLocaleDateString("vi-VN",{weekday:"long",day:"2-digit",month:"2-digit",year:"numeric"})}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <div style="display:flex;gap:0.3rem;font-size:0.72rem;font-weight:800">
          <span style="background:#3b82f610;color:#3b82f6;padding:0.15rem 0.45rem;border-radius:6px">${o.length} job</span>
          <span style="background:#22c55e10;color:#22c55e;padding:0.15rem 0.45rem;border-radius:6px">${f(a)}</span>
          ${d>0?'<span style="background:#ef444410;color:#ef4444;padding:0.15rem 0.45rem;border-radius:6px">Nợ '+f(d)+"</span>":""}
        </div>
        <button onclick="window.toggleTheme();window.updateUI()" class="theme-toggle">${r?"☀️":"🌙"}</button>
        <button onclick="window.logout()" style="background:#ef444408;border:1px solid #ef444425;color:#ef4444;padding:0.2rem 0.5rem;border-radius:6px;font-size:0.72rem;font-weight:700;cursor:pointer;font-family:inherit">🚪 Thoát</button>
      </div>
    </div>

    <div style="padding:0.8rem 1.5rem;max-width:1200px;margin:0 auto">
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.5rem;margin-bottom:0.8rem">
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:0.5rem 0.7rem;text-align:center;border-top:3px solid #3b82f6">
          <div style="font-size:0.5rem;font-weight:800;color:var(--text-dim);text-transform:uppercase">Tổng Job</div>
          <div style="font-size:1.2rem;font-weight:900;color:#3b82f6">${o.length}</div>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:0.5rem 0.7rem;text-align:center;border-top:3px solid #22c55e">
          <div style="font-size:0.5rem;font-weight:800;color:var(--text-dim);text-transform:uppercase">Đã thanh toán</div>
          <div style="font-size:1.2rem;font-weight:900;color:#22c55e">${f(l)}</div>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:0.5rem 0.7rem;text-align:center;border-top:3px solid #f97316">
          <div style="font-size:0.5rem;font-weight:800;color:var(--text-dim);text-transform:uppercase">Chưa thanh toán</div>
          <div style="font-size:1.2rem;font-weight:900;color:#f97316">${f(d)}</div>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:0.5rem 0.7rem;text-align:center;border-top:3px solid #8b5cf6">
          <div style="font-size:0.5rem;font-weight:800;color:var(--text-dim);text-transform:uppercase">Clips Edit</div>
          <div style="font-size:1.2rem;font-weight:900;color:#8b5cf6">${s.length}</div>
        </div>
      </div>

      <div style="display:flex;gap:0.25rem;margin-bottom:0.8rem;background:var(--accent-soft);border-radius:10px;padding:0.2rem;border:1px solid var(--border)">
        <button class="sp-tab" data-tab="jobs" style="flex:1;padding:0.35rem;border-radius:8px;border:none;cursor:pointer;font-weight:700;font-size:0.78rem;font-family:inherit;${u==="jobs"?"background:var(--primary);color:#fff":"background:transparent;color:var(--text-dim)"}">📋 Công việc (${o.length})</button>
        <button class="sp-tab" data-tab="payment" style="flex:1;padding:0.35rem;border-radius:8px;border:none;cursor:pointer;font-weight:700;font-size:0.78rem;font-family:inherit;${u==="payment"?"background:var(--primary);color:#fff":"background:transparent;color:var(--text-dim)"}">💰 Thanh toán</button>
        ${s.length>0?'<button class="sp-tab" data-tab="clips" style="flex:1;padding:0.35rem;border-radius:8px;border:none;cursor:pointer;font-weight:700;font-size:0.78rem;font-family:inherit;'+(u==="clips"?"background:var(--primary);color:#fff":"background:transparent;color:var(--text-dim)")+'">🎬 Clips ('+s.length+")</button>":""}
      </div>

      <div id="sp-jobs" style="${u==="jobs"?"":"display:none"}">
        ${p.length?'<div style="font-size:0.75rem;font-weight:800;color:var(--primary);margin-bottom:0.4rem">🔜 Sắp tới ('+p.length+")</div>":""}
        ${p.map(h=>'<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:0.6rem 0.8rem;margin-bottom:0.4rem;border-left:3px solid '+(h.isToday?"#f97316":"var(--primary)")+'"><div style="display:flex;justify-content:space-between;align-items:center"><div><span style="font-size:0.88rem;font-weight:800;color:var(--text-main)">'+h.client+"</span>"+(h.isToday?' <span style="font-size:0.55rem;background:#f97316;color:#fff;padding:0.1rem 0.3rem;border-radius:4px;font-weight:800">HÔM NAY</span>':"")+'</div><span style="font-size:0.72rem;font-weight:700;color:var(--text-dim)">'+h.dateStr+'</span></div><div style="font-size:0.68rem;color:var(--text-muted);margin-top:0.15rem">'+h.service+" · "+h.eventType+(h.address?" · 📍 "+h.address:"")+'</div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.25rem"><span style="font-size:0.72rem;font-weight:800;color:var(--primary)">'+f(h.cost)+'</span><span style="font-size:0.58rem;font-weight:700;padding:0.1rem 0.35rem;border-radius:4px;'+(h.paid?"background:#22c55e15;color:#22c55e":"background:#f9731615;color:#f97316")+'">'+(h.paid?"✅ Đã TT":"⏳ Chưa TT")+"</span></div></div>").join("")}
        ${c.length?'<div style="font-size:0.75rem;font-weight:800;color:var(--text-dim);margin:0.6rem 0 0.4rem">✅ Đã làm ('+c.length+")</div>":""}
        ${c.map(h=>'<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:0.6rem 0.8rem;margin-bottom:0.4rem;opacity:0.7"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:0.85rem;font-weight:800;color:var(--text-main)">'+h.client+'</span><span style="font-size:0.72rem;font-weight:700;color:var(--text-dim)">'+h.dateStr+'</span></div><div style="font-size:0.68rem;color:var(--text-muted);margin-top:0.15rem">'+h.service+" · "+h.eventType+'</div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.25rem"><span style="font-size:0.72rem;font-weight:800;color:var(--primary)">'+f(h.cost)+'</span><span style="font-size:0.58rem;font-weight:700;padding:0.1rem 0.35rem;border-radius:4px;'+(h.paid?"background:#22c55e15;color:#22c55e":"background:#f9731615;color:#f97316")+'">'+(h.paid?"✅ Đã TT":"⏳ Chưa TT")+"</span></div></div>").join("")}
        ${o.length===0?'<div style="text-align:center;padding:2rem;color:var(--text-dim);font-size:0.85rem">Chưa có công việc nào 🎬</div>':""}
      </div>

      <div id="sp-payment" style="${u==="payment"?"":"display:none"}">
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:0.8rem;margin-bottom:0.6rem">
          <div style="font-size:0.8rem;font-weight:800;color:var(--text-main);margin-bottom:0.5rem">💰 Tổng kết</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.5rem">
            <div style="text-align:center;padding:0.4rem;background:#3b82f608;border-radius:8px"><div style="font-size:0.5rem;font-weight:800;color:#3b82f6;text-transform:uppercase">Tổng thu nhập</div><div style="font-size:1rem;font-weight:900;color:#3b82f6">${f(a)}</div></div>
            <div style="text-align:center;padding:0.4rem;background:#22c55e08;border-radius:8px"><div style="font-size:0.5rem;font-weight:800;color:#22c55e;text-transform:uppercase">Đã nhận</div><div style="font-size:1rem;font-weight:900;color:#22c55e">${f(l)}</div></div>
            <div style="text-align:center;padding:0.4rem;background:#f9731608;border-radius:8px"><div style="font-size:0.5rem;font-weight:800;color:#f97316;text-transform:uppercase">Còn nợ</div><div style="font-size:1rem;font-weight:900;color:#f97316">${f(d)}</div></div>
          </div>
        </div>
        ${o.map(h=>'<div style="background:var(--bg-card);border:1px solid '+(h.paid?"#22c55e":"#f97316")+'20;border-radius:10px;padding:0.5rem 0.7rem;margin-bottom:0.35rem;display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:0.82rem;font-weight:700;color:var(--text-main)">'+h.client+'</div><div style="font-size:0.62rem;color:var(--text-dim)">'+h.dateStr+" · "+h.service+'</div></div><div style="text-align:right"><div style="font-size:0.85rem;font-weight:800;color:'+(h.paid?"#22c55e":"#f97316")+'">'+f(h.cost)+'</div><div style="font-size:0.55rem;font-weight:700;color:'+(h.paid?"#22c55e":"#f97316")+'">'+(h.paid?"✅ Đã thanh toán":"⏳ Chờ thanh toán")+"</div></div></div>").join("")}
      </div>

      <div id="sp-clips" style="${u==="clips"?"":"display:none"}">
        ${s.length===0?'<div style="text-align:center;padding:2rem;color:var(--text-dim)">Không có clip nào 🎬</div>':""}
        ${s.map(h=>'<div style="background:var(--bg-card);border:1px solid '+h.sc+"25;border-radius:10px;padding:0.6rem 0.8rem;margin-bottom:0.4rem;border-left:3px solid "+h.sc+'"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.2rem"><span style="font-size:0.88rem;font-weight:800;color:var(--text-main)">'+h.client+'</span><span style="font-size:0.65rem;font-weight:800;color:'+h.sc+";background:"+h.sc+'12;padding:0.15rem 0.4rem;border-radius:5px">'+h.editStatus+'</span></div><div style="font-size:0.68rem;color:var(--text-dim);margin-bottom:0.3rem">'+h.service+" · �� "+h.dateStr+'</div><div style="background:'+h.sc+"10;border:1px solid "+h.sc+"20;border-radius:8px;padding:0.3rem 0.5rem;display:flex;justify-content:space-between;align-items:center;"+(h.daysLeft<=0&&h.editStatus!=="Hoàn thành"?"animation:pulse 2s infinite":"")+'"><span style="font-size:0.68rem;font-weight:800;color:'+h.sc+'">⏰ DL: '+h.deadlineStr+'</span><span style="font-size:0.68rem;font-weight:800;color:'+h.sc+'">'+(h.editStatus==="Hoàn thành"?"✅ Đã xong":h.daysLeft>0?"⏳ "+h.daysLeft+" ngày":"🚨 Trễ "+Math.abs(h.daysLeft)+" ngày!")+"</span></div>"+(h.editorNote?'<div style="font-size:0.62rem;color:var(--text-muted);margin-top:0.25rem;background:#3b82f608;padding:0.2rem 0.4rem;border-radius:5px">✏️ '+h.editorNote+"</div>":"")+(h.editDriveLink?'<div style="margin-top:0.2rem"><a href="'+h.editDriveLink+'" target="_blank" style="font-size:0.62rem;color:#3b82f6;font-weight:700">🔗 Mở link sản phẩm</a></div>':"")+"</div>").join("")}
      </div>
    </div>
    <style>@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.7}}</style>
  `,e.addEventListener("click",h=>{const v=h.target.closest(".sp-tab");v&&(t.staffPortalTab=v.dataset.tab,window.updateUI())}),e}function Fo(t){const e=document.createElement("div"),n=new Date;n.setHours(0,0,0,0);const i=7,r=[];t.jobs.forEach(g=>{g.isTrash||(g.deliverables||[]).forEach((_,b)=>{if(!(_.type==="Photo"))return;const x=new Date(g.date);x.setHours(0,0,0,0);const T=new Date(x);T.setDate(T.getDate()+i);const $=Math.ceil((T-n)/864e5),I=_.editStatus||"Chưa bắt đầu";let B,P;I==="Hoàn thành"?(B="HOÀN THÀNH",P="#22c55e"):$>5?(B="THOẢI MÁI",P="#22c55e"):$>2?(B="CẦN ĐẨY",P="#eab308"):$>0?(B="GẤP",P="#f97316"):(B="QUÁ HẠN",P="#ef4444"),r.push({jobId:g.id,jobNo:g.jobNo,client:g.client,qty:_.quantity||1,service:_.name,serviceIdx:b,staff:_.editor||"",editStaff:_.editor||"",editStatus:I,editDriveLink:_.editDriveLink||"",deadlineStr:T.toLocaleDateString("vi-VN"),daysLeft:$,stage:B,sc:P,jobDate:g.date})})});const o={"QUÁ HẠN":0,GẤP:1,"CẦN ĐẨY":2,"THOẢI MÁI":3,"HOÀN THÀNH":4};r.sort((g,_)=>(o[g.stage]??5)-(o[_.stage]??5)||g.daysLeft-_.daysLeft);const s=t.editPhotoFilter||"TẤT CẢ",a=[...new Set(r.map(g=>g.editStaff||g.staff).filter(Boolean))].sort();let l=s==="TẤT CẢ"?r:r.filter(g=>(g.editStaff||g.staff)===s);const d=t.editPhotoStatusFilter||"ALL";d==="DONE"?l=l.filter(g=>g.editStatus==="Hoàn thành"):d==="PENDING"?l=l.filter(g=>g.editStatus!=="Hoàn thành"):d==="PENDING_DEMO"&&(l=l.filter(g=>g.editStatus==="Chưa bắt đầu"||g.editStatus==="Đang chỉnh sửa"));const p=r.length,c=r.filter(g=>g.editStatus==="Hoàn thành").length,f=r.filter(g=>g.stage==="QUÁ HẠN").length,u=(t.editPhotoView||"kanban")==="kanban";t.staff.map(g=>'<option value="'+g.name+'">'+g.name+"</option>").join("");const h=[{key:"Chưa bắt đầu",label:"📥 Chưa bắt đầu",color:"#94a3b8"},{key:"Đang chỉnh sửa",label:"🎨 Đang chỉnh sửa",color:"#3b82f6"},{key:"Demo",label:"👁️ Demo",color:"#a855f7"},{key:"Chỉnh sửa lại",label:"🔄 Chỉnh sửa lại",color:"#f97316"},{key:"Hoàn thành",label:"✅ Hoàn thành",color:"#22c55e"}],v=g=>{const _=window.state?.locks?.[g.jobId];return`
    <div class="ep-card ${_?"locked-card":""}" onclick="${_?"":`window.openQuickPreview('${g.jobId}')`}" data-jobid="${g.jobId}" data-svcname="${g.serviceIdx}" style="${_?"opacity:0.6;pointer-events:none;":""} background:${g.editStatus!=="Hoàn thành"&&g.stage==="QUÁ HẠN"?"#fef2f2":g.editStatus!=="Hoàn thành"&&g.stage==="GẤP"?"#fff7ed":"var(--bg-main)"};border:1px solid ${g.sc}30;border-radius:6px;padding:0.4rem 0.5rem;margin-bottom:0.4rem;border-left:3px solid ${g.sc};cursor:grab;box-shadow:0 1px 2px rgba(0,0,0,0.03);position:relative;">
      ${_?`<div style="position:absolute;top:-5px;right:-5px;background:#ef4444;color:#fff;font-size:0.5rem;padding:0.15rem 0.4rem;border-radius:10px;z-index:10;box-shadow:0 2px 4px rgba(0,0,0,0.2)">🔒 ${window.state.locks[g.jobId]}</div>`:""}
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.15rem">
        <span style="font-size:0.75rem;font-weight:800;color:var(--text-main);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:130px" title="${g.client}">${g.client}</span>
        ${g.editStatus!=="Hoàn thành"&&g.daysLeft<=0?'<span title="Quá hạn" style="animation:pulse 2s infinite;font-size:0.65rem">🚨</span>':""}
      </div>
      <div style="font-size:0.6rem;color:var(--text-dim);margin-bottom:0.3rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${g.service}">📸 ${g.service} <strong style="color:var(--text-main)">(x${g.qty})</strong></div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:0.55rem;font-weight:700;color:${g.editStatus==="Hoàn thành"?"#22c55e":g.daysLeft>0?"var(--text-dim)":"#ef4444"}">⏰ ${g.deadlineStr}</span>
        <span style="font-size:0.55rem;font-weight:700;background:#a855f715;color:#a855f7;padding:0.15rem 0.3rem;border-radius:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:70px" title="${g.editStaff||"Chưa gán"}">✏️ ${g.editStaff||"Trống"}</span>
      </div>
    </div>`};return p===0?(e.innerHTML='<header class="section-header"><div><h1 class="view-title">📸 Edit Photo Tracker</h1><p style="color:var(--text-dim);font-size:0.85rem;margin-top:0.2rem">Tiến độ hậu kỳ hình ảnh — Deadline '+i+' ngày</p></div></header><div style="text-align:center;padding:4rem 2rem;color:var(--text-dim)"><div style="font-size:3rem;margin-bottom:1rem">📸</div><div style="font-size:1.1rem;font-weight:700;margin-bottom:0.5rem;color:var(--text-main)">Chưa có thành phẩm ảnh nào</div><p style="font-size:0.85rem;max-width:400px;margin:0 auto">Khi dự án có deliverables loại <b>Photo</b>, chúng sẽ hiển thị ở đây để theo dõi tiến độ hậu kỳ.</p></div>',e):(e.innerHTML='<header class="section-header"><div><h1 class="view-title">📸 Edit Photo Tracker</h1><p style="color:var(--text-dim);font-size:0.85rem;margin-top:0.2rem">Tiến độ hậu kỳ hình ảnh — Deadline '+i+' ngày</p></div></header><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1rem"><div class="glass-panel" style="padding:0.8rem;border-top:3px solid #3b82f6;text-align:center"><div style="font-size:0.6rem;color:var(--text-dim);text-transform:uppercase;font-weight:800">Tổng Ảnh</div><div style="font-size:1.6rem;font-weight:900;color:#3b82f6">'+p+'</div></div><div class="glass-panel" style="padding:0.8rem;border-top:3px solid #22c55e;text-align:center"><div style="font-size:0.6rem;color:var(--text-dim);text-transform:uppercase;font-weight:800">Đã xong</div><div style="font-size:1.6rem;font-weight:900;color:#22c55e">'+c+'</div></div><div class="glass-panel" style="padding:0.8rem;border-top:3px solid #f97316;text-align:center"><div style="font-size:0.6rem;color:var(--text-dim);text-transform:uppercase;font-weight:800">Còn lại</div><div style="font-size:1.6rem;font-weight:900;color:#f97316">'+(p-c)+'</div></div><div class="glass-panel" style="padding:0.8rem;border-top:3px solid #ef4444;text-align:center"><div style="font-size:0.6rem;color:var(--text-dim);text-transform:uppercase;font-weight:800">Quá hạn</div><div style="font-size:1.6rem;font-weight:900;color:#ef4444">'+f+`</div></div></div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.8rem;flex-wrap:wrap;gap:0.5rem"><div style="display:flex;gap:0.3rem;flex-wrap:wrap"><button onclick="window.setEditPhotoFilter('TẤT CẢ')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;`+(s==="TẤT CẢ"?"background:var(--primary);color:#fff;border:none":"background:#fff;color:var(--text-dim);border:1px solid var(--border)")+'">Tất cả</button>'+a.map(g=>`<button onclick="window.setEditPhotoFilter('`+g+`')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;`+(s===g?"background:var(--primary);color:#fff;border:none":"background:#fff;color:var(--text-dim);border:1px solid var(--border)")+'">'+g+"</button>").join("")+`</div><div style="display:flex;gap:0.3rem"><button onclick="window.setEditPhotoStatusFilter('ALL')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;`+(d==="ALL"?"background:#3b82f6;color:#fff;border:none":"background:#fff;color:var(--text-dim);border:1px solid var(--border)")+'">📸 Tất cả ('+p+`)</button><button onclick="window.setEditPhotoStatusFilter('PENDING')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;`+(d==="PENDING"?"background:#f97316;color:#fff;border:none":"background:#fff;color:var(--text-dim);border:1px solid var(--border)")+'">⚠️ Chưa xong ('+(p-c)+`)</button><button onclick="window.setEditPhotoStatusFilter('PENDING_DEMO')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;`+(d==="PENDING_DEMO"?"background:#8b5cf6;color:#fff;border:none":"background:#fff;color:var(--text-dim);border:1px solid var(--border)")+'">🚀 Chưa gửi Demo ('+r.filter(g=>g.editStatus==="Chưa bắt đầu"||g.editStatus==="Đang chỉnh sửa").length+`)</button><button onclick="window.setEditPhotoStatusFilter('DONE')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;`+(d==="DONE"?"background:#22c55e;color:#fff;border:none":"background:#fff;color:var(--text-dim);border:1px solid var(--border)")+'">✅ Xong ('+c+`)</button></div><div style="display:flex;gap:0.3rem"><button onclick="window.toggleEditPhotoView('kanban')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;`+(u?"background:var(--primary);color:#fff;border:none":"background:#fff;color:var(--text-dim);border:1px solid var(--border)")+`">📋 Kanban</button><button onclick="window.toggleEditPhotoView('list')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;`+(u?"background:#fff;color:var(--text-dim);border:1px solid var(--border)":"background:var(--primary);color:#fff;border:none")+'">📝 List</button></div></div>'+(u?'<div id="ep-kanban" style="display:grid;grid-template-columns:repeat('+h.length+',1fr);gap:0.6rem;overflow-x:auto">'+h.map(g=>{const _=l.filter(y=>y.editStatus===g.key).length;let b=l.filter(y=>y.editStatus===g.key);return g.key==="Hoàn thành"&&b.length>50&&(b.sort((y,x)=>new Date(x.jobDate)-new Date(y.jobDate)),b=b.slice(0,50)),'<div class="ep-col" data-status="'+g.key+'" style="background:var(--bg-deep);border:1px solid var(--border);border-radius:10px;padding:0.5rem;min-height:200px;border-top:3px solid '+g.color+'"><div style="font-size:0.72rem;font-weight:800;color:'+g.color+';margin-bottom:0.4rem;text-align:center">'+g.label+" ("+_+')</div><div class="ep-col-cards" data-status="'+g.key+'">'+b.map(v).join("")+"</div></div>"}).join("")+"</div>":'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1rem">'+l.map(g=>'<div class="glass-panel" style="padding:0.7rem;border-left:3px solid '+g.sc+'"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.3rem"><span style="font-size:0.88rem;font-weight:800;color:var(--text-main)">'+g.client+' <span style="font-size:0.65rem;color:var(--text-dim)">#'+g.jobNo+'</span></span><span style="font-size:0.6rem;font-weight:800;color:'+g.sc+";background:"+g.sc+'12;padding:0.1rem 0.3rem;border-radius:4px">'+g.stage+'</span></div><div style="font-size:0.72rem;color:var(--text-dim);margin-bottom:0.25rem">📸 '+g.service+" (x"+g.qty+") · "+(g.editStaff||g.staff||"—")+'</div><div style="display:flex;justify-content:space-between;align-items:center"><div style="font-size:0.68rem;font-weight:700;color:'+g.sc+'">⏰ '+g.deadlineStr+`</div><select onchange="window.updateEditStatus('`+g.jobId+"','"+g.serviceIdx+`',this.value)" style="font-size:0.65rem;padding:0.15rem 0.3rem;border-radius:6px;border:1px solid var(--border);font-family:inherit;background:var(--bg-card)">`+["Chưa bắt đầu","Đang chỉnh sửa","Demo","Chỉnh sửa lại","Hoàn thành"].map(_=>'<option value="'+_+'" '+(g.editStatus===_?"selected":"")+">"+_+"</option>").join("")+"</select></div></div>").join("")+"</div>"),e)}function Bo(t){const e=document.createElement("div");e.className="global-search-container",e.style.cssText="width: 600px; max-width: 95vw; background: var(--surface); border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.15); display: flex; flex-direction: column; max-height: 80vh";const n=t.globalSearchCommandHint,i=t.globalSearchQuery||"",r=t.globalSearchResults||[],o=[{label:"➕ Tạo dự án mới",cmd:"tạo job",keys:"> tạo job"},{label:"📅 Lịch nhắc việc",cmd:"lịch",keys:"> lịch"},{label:"📋 Kanban",cmd:"kanban",keys:"> kanban"},{label:"📊 Analytics",cmd:"analytics",keys:"> analytics"},{label:"🎬 Edit Video",cmd:"video",keys:"> video"},{label:"📸 Edit Photo",cmd:"ảnh",keys:"> ảnh"},{label:"🎭 Nhân sự",cmd:"nhân sự",keys:"> nhân sự"},{label:"📒 Tài chính",cmd:"tài chính",keys:"> tài chính"}],s=n!=null?`
    <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);background:rgba(59,130,246,0.04)">
      <div style="font-size:0.72rem;font-weight:800;color:#3b82f6;text-transform:uppercase;margin-bottom:0.6rem">⌨️ Lệnh nhanh — nhấn Enter hoặc click</div>
      <div style="display:flex;flex-direction:column;gap:0.3rem">
        ${o.filter(a=>!n||a.cmd.includes(n)||a.label.includes(n)).map(a=>`
          <div onclick="window._executeCommand('${a.cmd}')" style="display:flex;justify-content:space-between;align-items:center;padding:0.6rem 0.8rem;border-radius:8px;cursor:pointer;background:var(--bg-hover);border:1px solid var(--border);transition:0.15s" class="hover-bg-success">
            <span style="font-size:0.9rem;font-weight:700">${a.label}</span>
            <code style="font-size:0.68rem;background:rgba(0,0,0,0.07);padding:0.1rem 0.4rem;border-radius:4px;color:var(--text-dim)">${a.keys}</code>
          </div>`).join("")}
      </div>
    </div>`:r.length>0?r.map(a=>{const l=new Date(a.date),d=`T${l.getMonth()+1}/${l.getFullYear()}`;return`
      <div onclick="window._jumpToJob('${a.id}')" style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--border); cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: 0.2s" class="hover-bg-success">
        <div>
          <div style="font-weight: 700; color: var(--text-main); font-size: 1rem; margin-bottom: 0.25rem">${a.client}</div>
          <div style="font-size: 0.8rem; color: var(--text-dim); display: flex; gap: 0.75rem">
            <span>🔖 ${a.id}</span>
            <span>📱 ${a.phone||"Chưa có SĐT"}</span>
            <span>📍 ${a.venue||"Chưa xếp venue"}</span>
          </div>
        </div>
        <div style="text-align: right">
          <div style="font-size: 0.75rem; font-weight: 800; padding: 0.2rem 0.5rem; background: var(--bg-hover); border-radius: 6px; color: var(--primary)">${d}</div>
          <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.3rem">${a.status}</div>
        </div>
      </div>
    `}).join(""):i.length>1?'<div style="padding: 2rem; text-align: center; color: var(--text-dim)">Không tìm thấy kết quả nào cho "'+i+'"</div>':'<div style="padding: 2rem; text-align: center; color: var(--text-dim)"><div style="font-size:0.85rem;margin-bottom:0.5rem">Gõ tên cô dâu chú rể, SDT hoặc mã Job để tìm kiếm</div><div style="font-size:0.75rem;color:var(--text-dim);opacity:0.7">💡 Gõ <code style="background:rgba(0,0,0,0.08);padding:0.1rem 0.4rem;border-radius:4px">> lệnh</code> để mở tính năng nhanh</div></div>';return e.innerHTML=`
    <div style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 1rem; background: var(--surface)">
      <i class="fas fa-search" style="color: var(--primary); font-size: 1.2rem"></i>
      <input type="text" id="global-search-input" placeholder="Tìm kiếm... hoặc nhập > lệnh" value="${i}" autocomplete="off"
        style="flex: 1; border: none; outline: none; background: transparent; font-size: 1.1rem; color: var(--text-main); font-weight: 600">
      <button onclick="window.closeModal()" style="background: transparent; border: none; font-size: 1.2rem; cursor: pointer; color: var(--text-dim)">&times;</button>
    </div>
    <div style="overflow-y: auto; flex: 1; background: var(--bg-main)">
      ${s}
    </div>
  `,setTimeout(()=>{const a=e.querySelector("#global-search-input");a&&(a.focus(),a.value&&a.setSelectionRange(a.value.length,a.value.length),a.addEventListener("input",l=>{window._handleGlobalSearchInput(l.target.value)}))},10),e}function li(t,e){const n=document.createElement("div");n.style.cssText="min-height: 100vh; background: #dcd7ce; color: #333; position: relative";const i=l=>{const d=Date.parse(l?.date||"");if(!Number.isNaN(d)&&d>0)return d;const p=Number(String(l?.id||"").replace("PF-",""));return!Number.isNaN(p)&&p>0?p:0},r=(e.portfolios||[]).filter(l=>l.isVisible).sort((l,d)=>i(d)-i(l));if(t==="home"){document.body.style.background="#dcd7ce";const l=["Tất cả",...new Set(r.map(p=>p.category).filter(Boolean))],d="<style>@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');</style>";return n.innerHTML=d+`
      <style>
        .scrapbook-container {
           min-height: 100vh;
           background: #dcd7ce url('https://www.transparenttextures.com/patterns/cream-paper.png'); /* Subtle paper texture */
           color: #333;
           position: relative;
           overflow-x: hidden;
        }
        
        /* Premium Hero Section */
        .scrapbook-hero {
           padding: 6rem 2rem 4rem;
           text-align: center;
        }
        .scrapbook-hero h1 {
           font-family: 'Patrick Hand', cursive;
           font-size: clamp(4rem, 10vw, 7rem);
           color: #2c2925;
           margin: 0;
           line-height: 1;
           transform: rotate(-2deg);
        }
        .scrapbook-hero p {
           font-family: 'Space Mono', monospace;
           font-size: 1rem;
           color: #5c554b;
           margin-top: 1rem;
           letter-spacing: 2px;
        }
        
        .hub-filter-btn {
           background: transparent;
           border: 1px dashed rgba(0,0,0,0.3);
           color: #4a443a;
           padding: 0.5rem 1.2rem;
           font-family: 'Space Mono', monospace;
           font-size: 0.85rem;
           cursor: pointer;
           transition: all 0.3s ease;
           margin: 0.3rem;
           transform: rotate(calc(var(--rot) * 1deg));
        }
        .hub-filter-btn.active, .hub-filter-btn:hover {
           background: rgba(0,0,0,0.05);
           border: 1px solid #2c2925;
           color: #000;
           box-shadow: 2px 2px 0px rgba(0,0,0,0.1);
        }
        
        .scrapbook-grid {
           display: flex;
           flex-wrap: wrap;
           justify-content: center;
           gap: 3rem;
           padding: 2rem 2rem 8rem 2rem;
           max-width: 1400px;
           margin: 0 auto;
        }
        
        .scrapbook-card {
           background: #fff;
           padding: 1rem 1rem 3.5rem 1rem;
           box-shadow: 2px 6px 15px rgba(0,0,0,0.15);
           border-radius: 2px;
           text-decoration: none;
           color: #333;
           width: 100%;
           max-width: 320px; /* Fixed max-width for polaroid look while responsive */
           position: relative;
           transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease, z-index 0s;
           z-index: 1;
           display: flex;
           flex-direction: column;
           transform: rotate(calc(var(--rot) * 1deg)) translateY(calc(var(--y) * 1px));
        }
        
        .scrapbook-card.hidden {
           display: none !important;
        }
        
        .scrapbook-card:hover {
           transform: scale(1.08) rotate(0deg) translateY(0) !important;
           box-shadow: 8px 15px 30px rgba(0,0,0,0.25);
           z-index: 100;
        }
        
        /* Mobile Optimizations */
        @media (max-width: 768px) {
           .scrapbook-hero { padding: 4rem 1rem 2rem; }
           .scrapbook-hero h1 { font-size: 3.5rem; transform: rotate(0deg); }
           .scrapbook-grid { gap: 1.5rem; padding: 1rem 1rem 4rem 1rem; }
           
           /* Reduce rotation and translations on mobile to save horizontal space and prevent overflow */
           .scrapbook-card {
              padding: 0.75rem 0.75rem 2.5rem 0.75rem;
              transform: rotate(calc(var(--rot) * 0.4deg)) translateY(calc(var(--y) * 0.5px));
              max-width: 280px;
           }
           
           /* Disable hover zoom on mobile for smoother scrolling, keep shadow */
           .scrapbook-card:hover {
              transform: rotate(0deg) translateY(0) !important;
           }
           
           .scrapbook-title { font-size: 1.8rem; margin-top: 0.75rem; }
           .scrapbook-meta { bottom: 0.75rem; right: 1rem; font-size: 0.55rem; }
        }
        
        .scrapbook-img-wrapper {
           width: 100%;
           aspect-ratio: 1/1; /* Square for Polaroid */
           background: #eee;
           overflow: hidden;
           position: relative;
        }
        
        .scrapbook-img {
           width: 100%;
           height: 100%;
           object-fit: cover;
           filter: contrast(1.05) saturate(0.95); /* Slight vintage color grade */
        }
        
        .scrapbook-title {
           font-family: 'Patrick Hand', cursive;
           font-size: 2.2rem;
           line-height: 1.1;
           margin-top: 1rem;
           text-align: center;
           color: #222;
        }
        
        .scrapbook-meta {
           position: absolute;
           bottom: 1rem;
           right: 1.5rem;
           font-family: 'Space Mono', monospace;
           font-size: 0.65rem;
           color: #666;
           transform: rotate(-3deg);
           text-align: right;
        }
        
        /* Washi tape variants */
        .washi-tape {
           position: absolute;
           width: 120px;
           height: 30px;
           box-shadow: 0 1px 3px rgba(0,0,0,0.1);
           z-index: 5;
           opacity: 0.85;
           pointer-events: none;
        }
        .washi-1 {
           top: -15px; left: 50%;
           transform: translateX(-50%) rotate(-4deg);
           background: rgba(225, 218, 203, 0.9);
           border-left: 3px dashed rgba(0,0,0,0.1);
           border-right: 3px dashed rgba(0,0,0,0.1);
        }
        .washi-2 {
           top: -10px; right: -20px;
           transform: rotate(45deg);
           background: rgba(200, 210, 200, 0.8); /* Sage tint */
           width: 80px;
        }
        .washi-3 {
           bottom: 10px; left: -20px;
           transform: rotate(-35deg);
           background: rgba(230, 200, 190, 0.8); /* Blush tint */
           width: 70px;
        }
        
        /* Additional styling for decorative elements */
        .washi-text {
            font-family: 'Patrick Hand', cursive;
            font-size: 1rem;
            color: #4a443a;
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            white-space: nowrap;
        }
      </style>
      
      <div class="scrapbook-container">
         <header style="padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; position: absolute; width: 100%; z-index: 10">
            <div style="font-family: 'Special Elite', monospace; font-size: 1.2rem; font-weight: bold; letter-spacing: 2px;">HARU.</div>
            <div style="font-family: 'Caveat', cursive; font-size: 1.8rem; color: #5c554b;">Our Memories</div>
         </header>
         
         <section class="scrapbook-hero">
            <h1>Câu chuyện về Chúng tôi</h1>
            <p>A DIGITAL SCRAPBOOK BY HARU STUDIO</p>
         </section>
         
         <!-- Filters -->
         <section style="display: flex; gap: 0.8rem; flex-wrap: wrap; justify-content: center; margin-bottom: 3rem; padding: 0 1rem;">
            ${l.map((p,c)=>`
               <button class="hub-filter-btn ${c===0?"active":""}" data-filter="${p}" style="--rot: ${Math.random()*4-2}">${p}</button>
            `).join("")}
         </section>
         
         <!-- Scattered Scrapbook Grid -->
         <section class="scrapbook-grid">
            ${r.length===0?'<div style="font-family: Caveat; font-size: 2rem; color: #888; text-align: center; width: 100%;">Cuốn sổ chưa có trang nào...</div>':r.map((p,c)=>{const f=(Math.random()*12-6).toFixed(1),u=(Math.random()*40-20).toFixed(0),h=c%3===0?"washi-1":c%3===1?"washi-2":"washi-3",v=c%3===1?'<div class="washi-tape washi-3"></div>':"";return`
              <a href="?gallery=${p.id}" class="scrapbook-card" data-category="${p.category}" style="--rot: ${f}; --y: ${u};">
                 <div class="washi-tape ${h}"></div>
                 ${v}
                 <div class="scrapbook-img-wrapper">
                    <img class="scrapbook-img" src="${p.thumbnail||p.images?.[0]||""}" crossorigin="anonymous">
                 </div>
                 <div class="scrapbook-title">${p.jobName}</div>
                 <div class="scrapbook-meta">
                    [ ${p.category} ]<br>
                    ${p.date?new Date(p.date).toLocaleDateString("vi-VN"):""}
                 </div>
              </a>
            `}).join("")}
         </section>
         
         <footer style="padding: 4rem 2rem; text-align: center; font-family: 'Special Elite', monospace; font-size: 0.75rem; color: #888;">
            &copy; ${new Date().getFullYear()} Haru Studio.
         </footer>
      </div>
    `,requestAnimationFrame(()=>{const p=n.querySelectorAll(".hub-filter-btn"),c=n.querySelectorAll(".scrapbook-card");p.forEach(f=>{f.addEventListener("click",()=>{p.forEach(h=>h.classList.remove("active")),f.classList.add("active");const u=f.dataset.filter;c.forEach(h=>{u==="Tất cả"||h.dataset.category===u?h.classList.remove("hidden"):h.classList.add("hidden")})})})}),n}const o=r.find(l=>l.id===t);if(!o)return n.innerHTML=`
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; text-align:center">
         <div style="font-size: 4rem; margin-bottom: 1rem">🍂</div>
         <h1 style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem">Bộ sưu tập không tồn tại hoặc đã bị ẩn</h1>
         <p style="color: #9ca3af; font-size: 0.9rem">Rất tiếc, đường link này không còn khả dụng.</p>
      </div>
    `,n;let s="";if(o.videoLink&&(o.videoLink.includes("youtube.com")||o.videoLink.includes("youtu.be"))){const l=/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,d=o.videoLink.match(l);d&&d[2].length===11&&(s=`https://www.youtube.com/embed/${d[2]}?autoplay=1&mute=0&controls=1&rel=0`)}const a=(e.portfolios||[]).filter(l=>l.id!==t&&l.isVisible).slice(0,4);return n.innerHTML=`
    <!-- Header -->
    <header style="position: absolute; top:0; left:0; right:0; padding: 1.5rem 2rem; z-index: 10; display: flex; justify-content: space-between; align-items: center; background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)">
       <div style="font-size: 1.25rem; font-weight: 900; letter-spacing: 2px; color: #fff;">HARU<span style="color:var(--primary)">STUDIO</span></div>
       <div style="font-size: 0.85rem; font-weight: 700; color: rgba(255,255,255,0.7)">Portfolio / Khách hàng</div>
    </header>

    <!-- Main Hero Video / Cover -->
    <section style="position: relative; width: 100%; height: 60vh; max-height: 800px; min-height: 400px; background: #000; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 2rem">
      ${s?`
         <iframe src="${s}" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none; opacity: 0.85; pointer-events: auto" allow="autoplay; fullscreen"></iframe>
         <div style="position: absolute; inset:0; background: linear-gradient(to top, #0a0a0a 0%, transparent 40%); pointer-events: none"></div>
      `:`
         <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: url('${o.thumbnail||o.images?.[0]||""}') center/cover no-repeat; opacity: 0.6"></div>
         <div style="position: absolute; inset:0; background: linear-gradient(to top, #0a0a0a 0%, transparent 60%)"></div>
      `}
      
      <div style="position: relative; z-index: 10; padding: 0 2rem; max-width: 1200px; margin: 0 auto; width: 100%">
         <span style="display:inline-block; font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: var(--primary); margin-bottom: 0.5rem">${o.category}</span>
         <h1 style="font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; color: #fff; margin-bottom: 0.5rem; line-height: 1.1; text-shadow: 0 2px 10px rgba(0,0,0,0.5)">${o.jobName}</h1>
         <div style="font-size: 0.9rem; color: #d1d5db; font-weight: 700"><i class="far fa-calendar-alt" style="margin-right:0.4rem"></i>${new Date(o.date).toLocaleDateString("vi-VN")}</div>
      </div>
    </section>

    <!-- Details actions -->
    <section style="max-width: 1200px; margin: 0 auto; padding: 2rem; position: relative; z-index: 20">
      ${o.description?`<p style="font-size: 1rem; color: #e5e7eb; line-height: 1.6; max-width: 800px; margin-bottom: 2rem; font-style: italic">"${o.description}"</p>`:""}
      
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem">
         ${o.photoLink?`
           <a href="${o.photoLink}" target="_blank" style="text-decoration: none; padding: 0.8rem 1.5rem; background: #fff; color: #000; border-radius: 8px; font-weight: 800; font-size: 0.9rem; transition: all 0.2s; box-shadow: 0 4px 15px rgba(255,255,255,0.1)">
             <i class="fas fa-image" style="margin-right: 0.5rem"></i> Xem Toàn Bộ Ảnh Nhỏ/Gốc (Drive)
           </a>
         `:""}
         ${o.videoLink&&s===""?`
           <a href="${o.videoLink}" target="_blank" style="text-decoration: none; padding: 0.8rem 1.5rem; background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; font-weight: 800; font-size: 0.9rem; transition: all 0.2s">
             <i class="fab fa-youtube" style="margin-right: 0.5rem; color: #ef4444"></i> Xem Video YouTube
           </a>
         `:""}
      </div>

      <!-- Masonry Grid for uploaded Images -->
      ${o.images&&o.images.length>0?`
         <style>
            .portfolio-masonry {
               column-count: 1;
               column-gap: 1.5rem;
               margin-top: 2rem;
            }
            @media (min-width: 640px) { .portfolio-masonry { column-count: 2; } }
            @media (min-width: 1024px) { .portfolio-masonry { column-count: 3; } }
            .portfolio-masonry-item {
               break-inside: avoid;
               margin-bottom: 1.5rem;
               border-radius: 12px;
               overflow: hidden;
               cursor: pointer;
               position: relative;
               transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .portfolio-masonry-item img {
               width: 100%;
               height: auto;
               display: block;
               transition: transform 0.5s ease;
            }
            .portfolio-masonry-item:hover {
               transform: translateY(-5px);
               box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
            }
            .portfolio-masonry-item:hover img {
               transform: scale(1.03);
            }
            .portfolio-masonry-item::after {
               content: '';
               position: absolute;
               inset: 0;
               background: rgba(0,0,0,0.1);
               opacity: 0;
               transition: opacity 0.3s;
            }
            .portfolio-masonry-item:hover::after {
               opacity: 1;
            }
         </style>
         
         <div class="portfolio-masonry">
            ${o.images.map((l,d)=>`
               <div class="portfolio-masonry-item" onclick="window._openLightbox(${d})">
                  <img src="${l}" loading="lazy" alt="Gallery Photo ${d+1}">
               </div>
            `).join("")}
         </div>
      `:""}

      <!-- Explore More -->
      ${a.length>0?`
        <div style="margin-top: 5rem; padding-top: 3rem; border-top: 1px solid rgba(255,255,255,0.1)">
          <h3 style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 1.5rem">Khám Phá Thêm</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem">
            ${a.map(l=>`
              <a href="?gallery=${l.id}" style="text-decoration:none; display:block; background: #111; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); transition: transform 0.2s">
                 <div style="width:100%; height:160px; background: url('${l.thumbnail||l.images?.[0]||""}') center/cover no-repeat; background-color: #222"></div>
                 <div style="padding: 1rem">
                    <div style="font-size: 0.65rem; color: var(--primary); font-weight: 800; text-transform: uppercase">${l.category}</div>
                    <div style="font-size: 0.9rem; font-weight: 800; color: #fff; margin-top: 0.3rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${l.jobName}</div>
                 </div>
              </a>
            `).join("")}
          </div>
        </div>
      `:""}
      
      <footer style="margin-top: 5rem; text-align: center; color: rgba(255,255,255,0.3); font-size: 0.75rem">
         &copy; ${new Date().getFullYear()} Haru Studio. All rights reserved.
      </footer>
    </section>
  `,n}function jo(t){const e=document.createElement("div");e.className="container",t.portfolios||(t.portfolios=[]);const n=r=>{const o=Date.parse(r?.date||"");if(!Number.isNaN(o)&&o>0)return o;const s=Number(String(r?.id||"").replace("PF-",""));return!Number.isNaN(s)&&s>0?s:0},i=[...t.portfolios].sort((r,o)=>n(o)-n(r));return e.innerHTML=`
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem">
      <h2 style="font-size: 1.5rem; font-weight: 800; display:flex; align-items:center; gap:0.5rem">
        <span style="font-size:2rem">🖼️</span> Quản lý Portfolio
      </h2>
      <div style="display: flex; gap: 1rem">
        <button class="btn" onclick="navigator.clipboard.writeText(window.location.origin + '?hub=haru').then(() => alert('Đã copy link trang Portfolio tĩnh!'))" style="background:var(--bg-body); border:1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.05); font-weight:600">
           <i class="fas fa-link" style="color:var(--primary); margin-right: 0.4rem;"></i> Copy Link Hub Khách
        </button>
        <button class="btn" onclick="window.migrateLocalToFirebase && window.migrateLocalToFirebase()" style="background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;border:none;font-weight:700;box-shadow:0 4px 12px rgba(249,115,22,0.3)" title="Đẩy toàn bộ album từ máy này lên Firebase để tất cả thiết bị thấy">
           🚀 Migrate Local → Firebase
        </button>

        <button class="btn btn-primary" onclick="window._openPortfolioModal()" style="box-shadow: 0 4px 6px -1px rgba(22, 163, 74, 0.2); font-weight:600">+ Tạo Bộ sưu tập mới</button>
      </div>
    </div>

    <div style="background: var(--bg-card); border-radius: 12px; border: 1px solid var(--border); overflow: hidden">
      <div style="display: grid; grid-template-columns: 80px 1.5fr 1fr 1fr 100px; padding: 1rem; border-bottom: 1px solid var(--border); font-weight: 800; color: var(--text-dim); font-size: 0.85rem">
        <div>Ảnh bìa</div>
        <div>Tên bộ sưu tập</div>
        <div>Phân loại</div>
        <div>Ngày đăng</div>
        <div style="text-align: right">Thao tác</div>
      </div>
      <div>
        ${i.length===0?'<div style="padding: 2rem; text-align: center; color: var(--text-dim)">Chưa có bộ sưu tập nào. Nhấn "+ Tạo mới" để bắt đầu!</div>':i.map(r=>`
          <div style="display: grid; grid-template-columns: 80px 1.5fr 1fr 1fr 100px; padding: 1rem; border-bottom: 1px solid var(--border); align-items: center; transition: background 0.2s">
            <div style="width: 60px; height: 60px; border-radius: 8px; background: url('${r.thumbnail||r.images?.[0]||""}') center/cover; background-color: var(--border)"></div>
            <div>
              <div style="font-weight: 800; color: var(--text-main); font-size: 1rem; margin-bottom: 0.2rem">
                ${r.jobName} 
                ${r.isVisible?'<span style="font-size:0.6rem; padding: 0.15rem 0.4rem; background: rgba(22,163,74,0.1); color: var(--success); border-radius: 4px; vertical-align: middle; margin-left: 0.5rem">Công khai</span>':'<span style="font-size:0.6rem; padding: 0.15rem 0.4rem; background: rgba(239,68,68,0.1); color: var(--danger); border-radius: 4px; vertical-align: middle; margin-left: 0.5rem">Đã ẩn</span>'}
              </div>
              <div style="font-size: 0.8rem; color: var(--text-dim)">
                ${r.images?.length||0} ảnh • Link: <a href="?gallery=${r.id}" target="_blank" style="color:var(--primary)">/?gallery=${r.id}</a>
              </div>
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--text-main)"><span style="display:inline-block; padding: 0.3rem 0.6rem; background: var(--bg-body); border-radius: 6px">${r.category||"Khác"}</span></div>
            <div style="font-size: 0.9rem; color: var(--text-dim)">${r.date?new Date(r.date).toLocaleDateString("vi-VN"):"-"}</div>
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end">
              <button onclick="window._openPortfolioModal('${r.id}')" style="width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-body); color: var(--primary); cursor: pointer; display:flex; align-items:center; justify-content:center" title="Chỉnh sửa"><i class="fas fa-edit"></i></button>
              <button onclick="window._deletePortfolio('${r.id}')" style="width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-body); color: var(--danger); cursor: pointer; display:flex; align-items:center; justify-content:center" title="Xóa"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `,e}function Uo(t){const e=document.createElement("div");e.className="content-section";const n=t.gears||[],i=(t.gearBookings||[]).filter(a=>a.status==="out"),r=n.reduce((a,l)=>a+(l.price||0),0),o=a=>a?a.toLocaleString("vi-VN")+" đ":"—",s=[...new Set(n.map(a=>a.category||a.type))].sort();return e.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem">
      <div>
        <h2 style="font-size:2rem; font-weight:900; color:var(--text-main); margin:0; letter-spacing:-0.5px">KHO THIẾT BỊ <span style="font-size:1.4rem">📷</span></h2>
        <p style="color:var(--text-dim); margin-top:0.3rem; font-size:0.95rem">Quản lý ${n.length} thiết bị · Tổng giá trị <strong style="color:var(--primary)">${o(r)}</strong></p>
      </div>
      <div>
        <button class="btn btn-primary" onclick="window.promptAddGear()" style="padding:0.6rem 1rem">
          <i class="fas fa-plus"></i> Thêm Thiết Bị Mới
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:1rem; margin-bottom:1.5rem; justify-content: start">
      <div class="stat-card">
        <div class="stat-value">${n.length}</div>
        <div class="stat-label">Tổng thiết bị</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${n.filter(a=>a.type==="Camera").length}</div>
        <div class="stat-label">📷 Máy ảnh</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${n.filter(a=>a.type==="Lens").length}</div>
        <div class="stat-label">🔭 Ống kính</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${n.filter(a=>a.type==="Audio").length}</div>
        <div class="stat-label">🎙 Âm thanh</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${n.filter(a=>a.type==="Lưu trữ").length}</div>
        <div class="stat-label">💾 Lưu trữ</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${n.filter(a=>a.type==="Dựng").length}</div>
        <div class="stat-label">🖥 Dựng</div>
      </div>
      <div class="stat-card" style="border-left:4px solid #f59e0b">
        <div class="stat-value" style="color:#f59e0b">${i.length}</div>
        <div class="stat-label">Đang xuất kho</div>
      </div>
    </div>

    <!-- Search + Filter Bar -->
    <div style="margin-bottom:1rem">
      <input type="text" placeholder="🔍 Tìm thiết bị..." oninput="(function(q){document.querySelectorAll('.gear-item-card').forEach(c=>{c.style.display=c.textContent.toLowerCase().includes(q.toLowerCase())?'':'none'})})(this.value)" style="width:100%;padding:0.6rem 0.8rem;border:1.5px solid var(--border);border-radius:8px;font-size:0.9rem;font-family:inherit;margin-bottom:0.5rem;box-sizing:border-box" />
    </div>
    <div class="filter-bar gear-filter-bar" style="margin-bottom:1rem; overflow-x:auto">
      <div class="filter-group" style="flex-wrap:nowrap; gap:0.4rem; display:flex">
        <button class="filter-btn active" onclick="window.filterGearCat(this, 'ALL')">TẤT CẢ</button>
        ${s.map(a=>`<button class="filter-btn" onclick="window.filterGearCat(this, '${a}')">${a}</button>`).join("")}
      </div>
    </div>

    <div class="gear-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:1.2rem; align-items:start" id="gear-grid-container">
      ${n.length===0?'<div style="grid-column:1/-1; text-align:center; padding:3rem; background:rgba(0,0,0,0.02); border-radius:12px; border:2px dashed var(--border)">Chưa có thiết bị nào. Vui lòng thêm.</div>':""}
      ${n.map(a=>{const l=i.find(f=>f.gearId===a.id),d=l?"ĐANG SỬ DỤNG":a.status;let p="#16a34a";d==="ĐANG SỬ DỤNG"&&(p="#f59e0b"),d==="Đang bảo trì"&&(p="#ef4444");let c="📷";return a.type==="Lens"&&(c="🔭"),a.type==="Flycam"&&(c="🚁"),a.type==="Gimbal"&&(c="🦾"),a.type==="Flash"&&(c="⚡"),a.type==="Audio"&&(c="🎙"),a.type==="Lưu trữ"&&(c="💾"),a.type==="Dựng"&&(c="🖥"),`
          <div class="glass-panel gear-item-card" data-type="${a.type}" data-category="${a.category||a.type}" style="border: 1px solid var(--border); padding: 1.25rem; position:relative; overflow:hidden; border-top: 4px solid ${p}; transition: 0.2s">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem">
              <div style="flex:1; min-width:0">
                <div style="font-size:0.7rem; font-weight:800; color:var(--text-dim); text-transform:uppercase; letter-spacing:0.5px">${c} ${a.category||a.type}</div>
                <div style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-top:0.15rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap" title="${a.name}">${a.name}</div>
              </div>
              <button onclick="window.promptEditGear('${a.id}')" style="background:none; border:none; cursor:pointer; color:var(--text-dim); transition:0.2s; font-size:1rem; flex-shrink:0; margin-left:0.5rem" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-dim)'">
                <i class="fas fa-ellipsis-v"></i>
              </button>
            </div>
            
            <div style="display:flex; flex-direction:column; gap:0.35rem; font-size:0.85rem; padding-bottom:0.75rem; border-bottom:1px solid rgba(0,0,0,0.06); margin-bottom:0.75rem">
              <div style="display:flex; justify-content:space-between">
                <span style="color:var(--text-dim)">Giá trị:</span>
                <span style="font-weight:700; color:var(--primary)">${o(a.price)}</span>
              </div>
              ${(a.qty||1)>1?`<div style="display:flex; justify-content:space-between">
                <span style="color:var(--text-dim)">Số lượng:</span>
                <span style="font-weight:700; color:var(--text-main)">${a.qty}</span>
              </div>`:""}
              <div style="display:flex; justify-content:space-between">
                <span style="color:var(--text-dim)">Trạng thái:</span>
                <span style="font-weight:800; color:${p}">${d}</span>
              </div>
              ${a.serial?`<div style="display:flex; justify-content:space-between">
                <span style="color:var(--text-dim)">Serial:</span>
                <span style="font-weight:700; color:var(--text-main)">${a.serial}</span>
              </div>`:""}
              ${a.notes?`<div style="font-size:0.75rem; color:#ef4444; font-style:italic">Ghi chú: ${a.notes}</div>`:""}
            </div>

            ${l?`
              <div style="background:#fef3c7; border:1px solid #f59e0b40; border-radius:8px; padding:0.75rem; font-size:0.8rem">
                <div style="font-weight:800; color:#b45309; margin-bottom:0.25rem">ĐANG ĐƯỢC XUẤT KHO</div>
                <div style="color:#92400e; font-weight:600">Nhân sự: ${l.staff}</div>
                <div style="color:#92400e; margin-top:0.2rem">Job ID: #${l.jobId}</div>
                <button onclick="window.returnGear('${a.id}')" class="btn" style="width:100%; margin-top:0.6rem; background:#f59e0b; color:#fff; border:none; font-size:0.8rem; padding:0.4rem">Hoàn Trả (Check-in)</button>
              </div>
            `:`
              <div style="display:flex; gap:0.5rem">
                <button onclick="window.promptCheckoutGear('${a.id}')" class="btn btn-secondary" style="flex:1; font-size:0.8rem; padding:0.5rem; border-color:var(--primary); color:var(--primary); font-weight:800" ${d==="Đang bảo trì"?'disabled style="opacity:0.5"':""}>
                  <i class="fas fa-sign-out-alt"></i> Xuất Kho
                </button>
              </div>
            `}
          </div>
        `}).join("")}
    </div>
  `,e}function Vo(t){const e=document.createElement("div");e.className="view-container reveal";const n=t.currentYear,i=[];let r=0;for(let h=1;h<=12;h++){const v=t.jobs.filter(T=>{if(T.isTrash)return!1;const $=new Date(T.date);return $.getFullYear()===n&&$.getMonth()+1===h}),g=v.reduce((T,$)=>T+($.package||0),0),_=v.reduce((T,$)=>T+$.services.reduce((I,B)=>I+(B.cost||0),0),0),b=v.reduce((T,$)=>T+$.services.reduce((I,B)=>I+(B.edit||0),0),0),y=_+b,x=g-y;g>r&&(r=g),i.push({m:h,jobs:v.length,revenue:g,totalCost:y,profit:x})}const o=i.reduce((h,v)=>h+v.revenue,0),s=i.reduce((h,v)=>h+v.totalCost,0),a=i.reduce((h,v)=>h+v.profit,0),l=i.reduce((h,v)=>h+v.jobs,0),d=o>0?(a/o*100).toFixed(1):0,p={};t.jobs.filter(h=>!h.isTrash&&new Date(h.date).getFullYear()===n).forEach(h=>{(h.services||[]).forEach(v=>{v.staff&&(p[v.staff]=(p[v.staff]||0)+(v.cost||0)),v.editStaff&&(p[v.editStaff]=(p[v.editStaff]||0)+(v.edit||0))})});const c=Object.entries(p).sort((h,v)=>v[1]-h[1]).slice(0,5),f=140,u=i.map(h=>{const v=r>0?Math.max(4,h.revenue/r*f):4,g=r>0?Math.max(0,h.profit/r*f):0,_=h.m===t.currentMonth;return`<div style="display:flex;flex-direction:column;align-items:center;flex:1;gap:0.2rem">
      <span style="font-size:0.6rem;font-weight:700;color:var(--text-dim)">${h.revenue>0?D(h.revenue):""}</span>
      <div style="width:100%;max-width:36px;display:flex;flex-direction:column;justify-content:flex-end;height:${f}px">
        <div style="width:100%;height:${v}px;background:${_?"var(--primary)":"rgba(22,163,74,0.3)"};border-radius:4px 4px 0 0;position:relative">
          <div style="width:100%;height:${g}px;background:${_?"#15803d":"rgba(22,163,74,0.15)"};border-radius:4px 4px 0 0;position:absolute;bottom:0"></div>
        </div>
      </div>
      <span style="font-size:0.7rem;font-weight:${_?900:600};color:${_?"var(--primary)":"var(--text-dim)"}">T${h.m}</span>
      <span style="font-size:0.55rem;color:var(--text-dim)">${h.jobs} job</span>
    </div>`}).join("");return e.innerHTML=`
    <header class="section-header">
      <div>
        <h1 class="view-title">📊 Báo Cáo Năm ${n}</h1>
        <p style="color:var(--text-dim);font-size:0.85rem">Tổng hợp doanh thu, chi phí và lợi nhuận cả năm</p>
      </div>
      <button class="btn btn-secondary btn-sm" onclick="window.navigate('finance')">← Tài chính</button>
    </header>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:1rem;margin:1.5rem 0">
      <div class="glass-panel" style="padding:1.2rem;border-top:3px solid var(--success)">
        <div style="font-size:0.65rem;color:var(--text-dim);text-transform:uppercase;font-weight:800;margin-bottom:0.3rem">Tổng doanh thu</div>
        <div style="font-size:1.4rem;font-weight:900;color:var(--success)">${D(o)}</div>
      </div>
      <div class="glass-panel" style="padding:1.2rem;border-top:3px solid var(--danger)">
        <div style="font-size:0.65rem;color:var(--text-dim);text-transform:uppercase;font-weight:800;margin-bottom:0.3rem">Tổng chi phí</div>
        <div style="font-size:1.4rem;font-weight:900;color:var(--danger)">${D(s)}</div>
      </div>
      <div class="glass-panel" style="padding:1.2rem;border-top:3px solid var(--primary)">
        <div style="font-size:0.65rem;color:var(--text-dim);text-transform:uppercase;font-weight:800;margin-bottom:0.3rem">Lợi nhuận ròng</div>
        <div style="font-size:1.4rem;font-weight:900;color:var(--primary)">${D(a)}</div>
        <div style="font-size:0.7rem;color:var(--text-dim);margin-top:0.2rem">Margin: ${d}%</div>
      </div>
      <div class="glass-panel" style="padding:1.2rem;border-top:3px solid #8b5cf6">
        <div style="font-size:0.65rem;color:var(--text-dim);text-transform:uppercase;font-weight:800;margin-bottom:0.3rem">Tổng dự án</div>
        <div style="font-size:1.4rem;font-weight:900;color:#8b5cf6">${l}</div>
      </div>
    </div>

    <div class="glass-panel" style="padding:1.5rem;margin-bottom:2rem">
      <h3 style="font-size:1rem;font-weight:900;margin-bottom:1rem">📈 Doanh thu theo tháng</h3>
      <div style="display:flex;gap:0.3rem;align-items:flex-end;padding:0 0.5rem">${u}</div>
      <div style="display:flex;gap:1rem;justify-content:center;margin-top:0.8rem;font-size:0.7rem;color:var(--text-dim)">
        <span><span style="display:inline-block;width:10px;height:10px;background:rgba(22,163,74,0.3);border-radius:2px;margin-right:4px"></span>Doanh thu</span>
        <span><span style="display:inline-block;width:10px;height:10px;background:rgba(22,163,74,0.15);border-radius:2px;margin-right:4px"></span>Lợi nhuận</span>
      </div>
    </div>

    <div class="glass-panel" style="padding:0;margin-bottom:2rem;overflow:hidden">
      <div style="padding:1rem 1.25rem;background:rgba(22,163,74,0.05);border-bottom:1px solid var(--border)">
        <h3 style="font-size:1rem;font-weight:900">📋 Chi tiết từng tháng</h3>
      </div>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;min-width:600px;font-size:0.82rem">
          <thead><tr style="background:var(--bg-body);color:var(--text-dim);font-size:0.7rem;text-transform:uppercase">
            <th style="padding:0.6rem 1rem;text-align:left;font-weight:800;border-bottom:1px solid var(--border)">Tháng</th>
            <th style="padding:0.6rem 1rem;text-align:right;font-weight:800;border-bottom:1px solid var(--border)">Jobs</th>
            <th style="padding:0.6rem 1rem;text-align:right;font-weight:800;border-bottom:1px solid var(--border)">Doanh thu</th>
            <th style="padding:0.6rem 1rem;text-align:right;font-weight:800;border-bottom:1px solid var(--border)">Chi phí</th>
            <th style="padding:0.6rem 1rem;text-align:right;font-weight:800;border-bottom:1px solid var(--border)">Lợi nhuận</th>
          </tr></thead>
          <tbody>
            ${i.map(h=>`<tr style="border-bottom:1px solid var(--border-bright);${h.m===t.currentMonth?"background:rgba(22,163,74,0.04);font-weight:700":""}">
              <td style="padding:0.6rem 1rem;font-weight:800">Tháng ${h.m}</td>
              <td style="padding:0.6rem 1rem;text-align:right">${h.jobs}</td>
              <td style="padding:0.6rem 1rem;text-align:right;color:var(--success)">${D(h.revenue)}</td>
              <td style="padding:0.6rem 1rem;text-align:right;color:var(--danger)">${D(h.totalCost)}</td>
              <td style="padding:0.6rem 1rem;text-align:right;font-weight:800;color:${h.profit>=0?"var(--primary)":"var(--danger)"}">${D(h.profit)}</td>
            </tr>`).join("")}
            <tr style="background:var(--bg-body);font-weight:900">
              <td style="padding:0.75rem 1rem">TỔNG NĂM</td>
              <td style="padding:0.75rem 1rem;text-align:right">${l}</td>
              <td style="padding:0.75rem 1rem;text-align:right;color:var(--success)">${D(o)}</td>
              <td style="padding:0.75rem 1rem;text-align:right;color:var(--danger)">${D(s)}</td>
              <td style="padding:0.75rem 1rem;text-align:right;color:var(--primary)">${D(a)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    ${c.length?`
    <div class="glass-panel" style="padding:1.25rem">
      <h3 style="font-size:1rem;font-weight:900;margin-bottom:1rem">🏆 Top Nhân Sự Theo Thu Nhập</h3>
      ${c.map((h,v)=>{const g=c[0][1]>0?h[1]/c[0][1]*100:0,_=["🥇","🥈","🥉","4️⃣","5️⃣"];return`<div style="display:flex;align-items:center;gap:0.8rem;padding:0.5rem 0;${v<c.length-1?"border-bottom:1px solid var(--border-bright)":""}">
          <span style="font-size:1.1rem">${_[v]}</span>
          <span style="font-weight:800;min-width:80px">${h[0]}</span>
          <div style="flex:1;height:8px;background:var(--bg-hover);border-radius:4px;overflow:hidden"><div style="height:100%;width:${g}%;background:linear-gradient(90deg,var(--primary),#22c55e);border-radius:4px"></div></div>
          <span style="font-weight:800;color:var(--primary);min-width:100px;text-align:right">${D(h[1])}</span>
        </div>`}).join("")}
    </div>`:""}
  `,e}function Ja(t){const e=document.createElement("div");e.style.cssText="min-height:100vh;background:linear-gradient(135deg,#f0fdf4 0%,#ecfdf5 50%,#f0f9ff 100%);font-family:system-ui,-apple-system,sans-serif;padding:0";const n=t.checklist||{},i=(t.services||[]).filter(f=>f&&f.service),r=i.some(f=>(Array.isArray(f.service)?f.service.join(" "):f.service||"").toLowerCase().includes("quay")),o=i.every(f=>!(Array.isArray(f.service)?f.service.join(" "):f.service||"").toLowerCase().includes("quay")||f.editStatus==="Hoàn thành"),s=new Date(t.date),a=s<new Date;let l=0;a&&(l=1),r&&o&&(l=2),(t.status==="Đã hoàn thành"||n.albumDelivered)&&(l=3),n.fullyPaid&&n.albumDelivered&&(l=4);const d=[{label:"Quay / Chụp",icon:"📸",desc:"Thực hiện ngày sự kiện"},{label:"Hậu kỳ",icon:"🎬",desc:"Chỉnh sửa & dựng phim"},{label:"Review",icon:"👀",desc:"Xem duyệt & feedback"},{label:"Giao hàng",icon:"📦",desc:"Bàn giao sản phẩm"}],p=d.map((f,u)=>{const h=u<l,v=u===l;return`<div style="display:flex;align-items:flex-start;gap:1rem;${u<d.length-1?"padding-bottom:1.5rem":""}">
      <div style="display:flex;flex-direction:column;align-items:center">
        <div style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;${h?"background:#16a34a;color:#fff;box-shadow:0 0 0 4px rgba(22,163,74,0.15)":v?"background:#fff;color:#16a34a;border:3px solid #16a34a;box-shadow:0 0 0 4px rgba(22,163,74,0.1)":"background:#f1f5f9;color:#94a3b8;border:2px solid #e2e8f0"}">${h?"✓":f.icon}</div>
        ${u<d.length-1?`<div style="width:3px;flex:1;min-height:20px;background:${h?"#16a34a":"#e2e8f0"};margin-top:0.3rem;border-radius:2px"></div>`:""}
      </div>
      <div style="padding-top:0.4rem">
        <div style="font-weight:800;font-size:0.95rem;color:${h?"#16a34a":v?"#0f172a":"#94a3b8"}">${f.label}</div>
        <div style="font-size:0.8rem;color:${h?"#16a34a80":"#94a3b8"};margin-top:0.1rem">${h?"✅ Hoàn tất":v?"🔄 Đang thực hiện":f.desc}</div>
      </div>
    </div>`}).join(""),c=[{key:"contractSigned",label:"Hợp đồng",icon:"📝"},{key:"depositReceived",label:"Đặt cọc",icon:"💰"},{key:"albumDelivered",label:"Album/Video",icon:"💿"},{key:"fullyPaid",label:"Thanh toán",icon:"✅"}];return e.innerHTML=`
    <div style="max-width:640px;margin:0 auto;padding:2rem 1.5rem">
      <!-- Header -->
      <div style="text-align:center;margin-bottom:2rem">
        <div style="font-size:0.75rem;font-weight:700;color:#16a34a;text-transform:uppercase;letter-spacing:2px;margin-bottom:0.5rem">HARU WEDDING FILM</div>
        <h1 style="font-size:1.8rem;font-weight:900;color:#0f172a;margin:0">Tiến Độ Dự Án</h1>
        <p style="color:#64748b;font-size:0.9rem;margin-top:0.3rem">${t.client}</p>
      </div>

      <!-- Event Info Card -->
      <div style="background:#fff;border-radius:16px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.06);margin-bottom:1.5rem">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <div>
            <div style="font-size:0.65rem;color:#94a3b8;font-weight:700;text-transform:uppercase">Ngày sự kiện</div>
            <div style="font-size:1rem;font-weight:800;color:#0f172a;margin-top:0.2rem">${s.toLocaleDateString("vi-VN",{weekday:"long",day:"2-digit",month:"2-digit",year:"numeric"})}</div>
          </div>
          <div>
            <div style="font-size:0.65rem;color:#94a3b8;font-weight:700;text-transform:uppercase">Loại sự kiện</div>
            <div style="font-size:1rem;font-weight:800;color:#0f172a;margin-top:0.2rem">${t.eventType||"Wedding"}</div>
          </div>
        </div>
        <div style="margin-top:1rem;padding-top:1rem;border-top:1px solid #f1f5f9">
          <div style="font-size:0.65rem;color:#94a3b8;font-weight:700;text-transform:uppercase">Trạng thái</div>
          <div style="display:inline-block;margin-top:0.3rem;padding:0.3rem 0.8rem;border-radius:20px;font-size:0.8rem;font-weight:700;background:${l===4?"#dcfce7;color:#16a34a":"#fef3c7;color:#d97706"}">${l===4?"✅ Hoàn tất":l===0?"📋 Sắp tới":"🔄 Đang tiến hành"}</div>
        </div>
      </div>

      <!-- Timeline -->
      <div style="background:#fff;border-radius:16px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.06);margin-bottom:1.5rem">
        <h3 style="font-size:0.9rem;font-weight:800;color:#0f172a;margin:0 0 1.25rem 0">📅 Tiến Độ Thực Hiện</h3>
        ${p}
      </div>

      <!-- Checklist -->
      <div style="background:#fff;border-radius:16px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.06);margin-bottom:1.5rem">
        <h3 style="font-size:0.9rem;font-weight:800;color:#0f172a;margin:0 0 1rem 0">📋 Checklist</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem">
          ${c.map(f=>{const u=n[f.key];return`<div style="display:flex;align-items:center;gap:0.6rem;padding:0.6rem 0.8rem;border-radius:10px;background:${u?"#f0fdf4":"#f8fafc"};border:1px solid ${u?"#bbf7d0":"#e2e8f0"}">
              <span style="font-size:1.1rem">${u?"✅":"⬜"}</span>
              <span style="font-size:0.82rem;font-weight:${u?700:500};color:${u?"#16a34a":"#94a3b8"}">${f.label}</span>
            </div>`}).join("")}
        </div>
      </div>

      <!-- Services -->
      ${i.length?`
      <div style="background:#fff;border-radius:16px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.06);margin-bottom:1.5rem">
        <h3 style="font-size:0.9rem;font-weight:800;color:#0f172a;margin:0 0 1rem 0">🎥 Dịch Vụ</h3>
        ${i.map(f=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:0.5rem 0;border-bottom:1px solid #f1f5f9">
          <span style="font-size:0.85rem;font-weight:600;color:#334155">${f.service}</span>
          <span style="font-size:0.72rem;font-weight:700;padding:0.2rem 0.6rem;border-radius:12px;${f.editStatus==="Hoàn thành"?"background:#dcfce7;color:#16a34a":f.editStatus==="Đang edit"?"background:#fef3c7;color:#d97706":"background:#f1f5f9;color:#94a3b8"}">${f.editStatus||"Chưa bắt đầu"}</span>
        </div>`).join("")}
      </div>`:""}

      <!-- Footer -->
      <div style="text-align:center;color:#94a3b8;font-size:0.72rem;padding:1rem 0">
        Powered by <strong>Haru Studio</strong> • Cập nhật tự động
      </div>
    </div>
  `,e}const Qa=Object.freeze(Object.defineProperty({__proto__:null,renderAnalytics:Do,renderBottomNav:yo,renderCalendar:Co,renderClientProgressView:Ja,renderClients:Mo,renderDashboard:ai,renderDeadlineEdit:$o,renderEditPhoto:Fo,renderEditVideo:Eo,renderEditorPortal:Ro,renderFinance:ko,renderGalleryClient:li,renderGearList:Uo,renderGlobalSearchModal:Bo,renderHistory:Lo,renderJobs:_o,renderKanban:Io,renderLoginScreen:Ho,renderModalOverlay:xo,renderMonthPicker:bo,renderNAS:Ao,renderPortfolioAdmin:jo,renderSettings:No,renderSidebar:vo,renderStaff:zo,renderStaffPortal:Oo,renderSync:Po,renderTax:To,renderTrash:So,renderWorkspace:wo,renderYearReport:Vo},Symbol.toStringTag,{value:"Module"})),Xa=()=>{};var xr={};const qo={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};const C=function(t,e){if(!t)throw _t(e)},_t=function(t){return new Error("Firebase Database ("+qo.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};const Go=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let r=t.charCodeAt(i);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},Za=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const r=t[n++];if(r<128)e[i++]=String.fromCharCode(r);else if(r>191&&r<224){const o=t[n++];e[i++]=String.fromCharCode((r&31)<<6|o&63)}else if(r>239&&r<365){const o=t[n++],s=t[n++],a=t[n++],l=((r&7)<<18|(o&63)<<12|(s&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const o=t[n++],s=t[n++];e[i++]=String.fromCharCode((r&15)<<12|(o&63)<<6|s&63)}}return e.join("")},Di={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let r=0;r<t.length;r+=3){const o=t[r],s=r+1<t.length,a=s?t[r+1]:0,l=r+2<t.length,d=l?t[r+2]:0,p=o>>2,c=(o&3)<<4|a>>4;let f=(a&15)<<2|d>>6,u=d&63;l||(u=64,s||(f=64)),i.push(n[p],n[c],n[f],n[u])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Go(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Za(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let r=0;r<t.length;){const o=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const d=r<t.length?n[t.charAt(r)]:64;++r;const c=r<t.length?n[t.charAt(r)]:64;if(++r,o==null||a==null||d==null||c==null)throw new el;const f=o<<2|a>>4;if(i.push(f),d!==64){const u=a<<4&240|d>>2;if(i.push(u),c!==64){const h=d<<6&192|c;i.push(h)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class el extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ko=function(t){const e=Go(t);return Di.encodeByteArray(e,!0)},fn=function(t){return Ko(t).replace(/\./g,"")},di=function(t){try{return Di.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function tl(t){return Yo(void 0,t)}function Yo(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!nl(n)||(t[n]=Yo(t[n],e[n]));return t}function nl(t){return t!=="__proto__"}function il(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}const rl=()=>il().__FIREBASE_DEFAULTS__,ol=()=>{if(typeof process>"u"||typeof xr>"u")return;const t=xr.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},sl=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&di(t[1]);return e&&JSON.parse(e)},Wo=()=>{try{return Xa()||rl()||ol()||sl()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},al=t=>Wo()?.emulatorHosts?.[t],ll=t=>{const e=al(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},Jo=()=>Wo()?.config;class be{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}function Li(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function dl(t){return(await fetch(t,{credentials:"include"})).ok}function cl(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",r=t.iat||0,o=t.sub||t.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const s={iss:`https://securetoken.google.com/${i}`,aud:i,iat:r,exp:r+3600,auth_time:r,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...t};return[fn(JSON.stringify(n)),fn(JSON.stringify(s)),""].join(".")}const Lt={};function fl(){const t={prod:[],emulator:[]};for(const e of Object.keys(Lt))Lt[e]?t.emulator.push(e):t.prod.push(e);return t}function pl(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let _r=!1;function ml(t,e){if(typeof window>"u"||typeof document>"u"||!Li(window.location.host)||Lt[t]===e||Lt[t]||_r)return;Lt[t]=e;function n(f){return`__firebase__banner__${f}`}const i="__firebase__banner",o=fl().prod.length>0;function s(){const f=document.getElementById(i);f&&f.remove()}function a(f){f.style.display="flex",f.style.background="#7faaf0",f.style.position="fixed",f.style.bottom="5px",f.style.left="5px",f.style.padding=".5em",f.style.borderRadius="5px",f.style.alignItems="center"}function l(f,u){f.setAttribute("width","24"),f.setAttribute("id",u),f.setAttribute("height","24"),f.setAttribute("viewBox","0 0 24 24"),f.setAttribute("fill","none"),f.style.marginLeft="-6px"}function d(){const f=document.createElement("span");return f.style.cursor="pointer",f.style.marginLeft="16px",f.style.fontSize="24px",f.innerHTML=" &times;",f.onclick=()=>{_r=!0,s()},f}function p(f,u){f.setAttribute("id",u),f.innerText="Learn more",f.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",f.setAttribute("target","__blank"),f.style.paddingLeft="5px",f.style.textDecoration="underline"}function c(){const f=pl(i),u=n("text"),h=document.getElementById(u)||document.createElement("span"),v=n("learnmore"),g=document.getElementById(v)||document.createElement("a"),_=n("preprendIcon"),b=document.getElementById(_)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(f.created){const y=f.element;a(y),p(g,v);const x=d();l(b,_),y.append(b,h,g,x),document.body.appendChild(y)}o?(h.innerText="Preview backend disconnected.",b.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(b.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,h.innerText="Preview backend running in this workspace."),h.setAttribute("id",u)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",c):c()}function hl(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Qo(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(hl())}function ul(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function gl(){return qo.NODE_ADMIN===!0}function vl(){try{return typeof indexedDB=="object"}catch{return!1}}function yl(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(i);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{e(r.error?.message||"")}}catch(n){e(n)}})}const bl="FirebaseError";class Wt extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=bl,Object.setPrototypeOf(this,Wt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Xo.prototype.create)}}class Xo{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},r=`${this.service}/${e}`,o=this.errors[e],s=o?wl(o,i):"Error",a=`${this.serviceName}: ${s} (${r}).`;return new Wt(r,a,i)}}function wl(t,e){return t.replace(xl,(n,i)=>{const r=e[i];return r!=null?String(r):`<${i}?>`})}const xl=/\{\$([^}]+)}/g;function Rt(t){return JSON.parse(t)}function ne(t){return JSON.stringify(t)}const Zo=function(t){let e={},n={},i={},r="";try{const o=t.split(".");e=Rt(di(o[0])||""),n=Rt(di(o[1])||""),r=o[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:r}},_l=function(t){const e=Zo(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},kl=function(t){const e=Zo(t).claims;return typeof e=="object"&&e.admin===!0};function ke(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function et(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function ci(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function pn(t,e,n){const i={};for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(i[r]=e.call(n,t[r],r,t));return i}function mn(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const r of n){if(!i.includes(r))return!1;const o=t[r],s=e[r];if(kr(o)&&kr(s)){if(!mn(o,s))return!1}else if(o!==s)return!1}for(const r of i)if(!n.includes(r))return!1;return!0}function kr(t){return t!==null&&typeof t=="object"}function Tl(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}class Cl{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let c=0;c<16;c++)i[c]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let c=0;c<16;c++)i[c]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let c=16;c<80;c++){const f=i[c-3]^i[c-8]^i[c-14]^i[c-16];i[c]=(f<<1|f>>>31)&4294967295}let r=this.chain_[0],o=this.chain_[1],s=this.chain_[2],a=this.chain_[3],l=this.chain_[4],d,p;for(let c=0;c<80;c++){c<40?c<20?(d=a^o&(s^a),p=1518500249):(d=o^s^a,p=1859775393):c<60?(d=o&s|a&(o|s),p=2400959708):(d=o^s^a,p=3395469782);const f=(r<<5|r>>>27)+d+l+p+i[c]&4294967295;l=a,a=s,s=(o<<30|o>>>2)&4294967295,o=r,r=f}this.chain_[0]=this.chain_[0]+r&4294967295,this.chain_[1]=this.chain_[1]+o&4294967295,this.chain_[2]=this.chain_[2]+s&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let r=0;const o=this.buf_;let s=this.inbuf_;for(;r<n;){if(s===0)for(;r<=i;)this.compress_(e,r),r+=this.blockSize;if(typeof e=="string"){for(;r<n;)if(o[s]=e.charCodeAt(r),++s,++r,s===this.blockSize){this.compress_(o),s=0;break}}else for(;r<n;)if(o[s]=e[r],++s,++r,s===this.blockSize){this.compress_(o),s=0;break}}this.inbuf_=s,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let r=this.blockSize-1;r>=56;r--)this.buf_[r]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let r=0;r<5;r++)for(let o=24;o>=0;o-=8)e[i]=this.chain_[r]>>o&255,++i;return e}}function ut(t,e){return`${t} failed: ${e} argument `}const Sl=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let r=t.charCodeAt(i);if(r>=55296&&r<=56319){const o=r-55296;i++,C(i<t.length,"Surrogate pair missing trail surrogate.");const s=t.charCodeAt(i)-56320;r=65536+(o<<10)+s}r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):r<65536?(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},Dn=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};function Pe(t){return t&&t._delegate?t._delegate:t}class Ot{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}const Qe="[DEFAULT]";class $l{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new be;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&i.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(i)return null;throw r}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Nl(e))try{this.getOrInitializeService({instanceIdentifier:Qe})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const o=this.getOrInitializeService({instanceIdentifier:r});i.resolve(o)}catch{}}}}clearInstance(e=Qe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Qe){return this.instances.has(e)}getOptions(e=Qe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[o,s]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(o);i===a&&s.resolve(r)}return r}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(i)??new Set;r.add(e),this.onInitCallbacks.set(i,r);const o=this.instances.get(i);return o&&e(o,i),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const r of i)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:El(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Qe){return this.component?this.component.multipleInstances?e:Qe:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function El(t){return t===Qe?void 0:t}function Nl(t){return t.instantiationMode==="EAGER"}class Il{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new $l(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}var G;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(G||(G={}));const Dl={debug:G.DEBUG,verbose:G.VERBOSE,info:G.INFO,warn:G.WARN,error:G.ERROR,silent:G.SILENT},Ll=G.INFO,zl={[G.DEBUG]:"log",[G.VERBOSE]:"log",[G.INFO]:"info",[G.WARN]:"warn",[G.ERROR]:"error"},Al=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),r=zl[e];if(r)console[r](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class es{constructor(e){this.name=e,this._logLevel=Ll,this._logHandler=Al,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in G))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Dl[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,G.DEBUG,...e),this._logHandler(this,G.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,G.VERBOSE,...e),this._logHandler(this,G.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,G.INFO,...e),this._logHandler(this,G.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,G.WARN,...e),this._logHandler(this,G.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,G.ERROR,...e),this._logHandler(this,G.ERROR,...e)}}const Pl=(t,e)=>e.some(n=>t instanceof n);let Tr,Cr;function Ml(){return Tr||(Tr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Hl(){return Cr||(Cr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ts=new WeakMap,fi=new WeakMap,ns=new WeakMap,Wn=new WeakMap,zi=new WeakMap;function Rl(t){const e=new Promise((n,i)=>{const r=()=>{t.removeEventListener("success",o),t.removeEventListener("error",s)},o=()=>{n(Be(t.result)),r()},s=()=>{i(t.error),r()};t.addEventListener("success",o),t.addEventListener("error",s)});return e.then(n=>{n instanceof IDBCursor&&ts.set(n,t)}).catch(()=>{}),zi.set(e,t),e}function Ol(t){if(fi.has(t))return;const e=new Promise((n,i)=>{const r=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",s),t.removeEventListener("abort",s)},o=()=>{n(),r()},s=()=>{i(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",o),t.addEventListener("error",s),t.addEventListener("abort",s)});fi.set(t,e)}let pi={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return fi.get(t);if(e==="objectStoreNames")return t.objectStoreNames||ns.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Be(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Fl(t){pi=t(pi)}function Bl(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(Jn(this),e,...n);return ns.set(i,e.sort?e.sort():[e]),Be(i)}:Hl().includes(t)?function(...e){return t.apply(Jn(this),e),Be(ts.get(this))}:function(...e){return Be(t.apply(Jn(this),e))}}function jl(t){return typeof t=="function"?Bl(t):(t instanceof IDBTransaction&&Ol(t),Pl(t,Ml())?new Proxy(t,pi):t)}function Be(t){if(t instanceof IDBRequest)return Rl(t);if(Wn.has(t))return Wn.get(t);const e=jl(t);return e!==t&&(Wn.set(t,e),zi.set(e,t)),e}const Jn=t=>zi.get(t);function Ul(t,e,{blocked:n,upgrade:i,blocking:r,terminated:o}={}){const s=indexedDB.open(t,e),a=Be(s);return i&&s.addEventListener("upgradeneeded",l=>{i(Be(s.result),l.oldVersion,l.newVersion,Be(s.transaction),l)}),n&&s.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{o&&l.addEventListener("close",()=>o()),r&&l.addEventListener("versionchange",d=>r(d.oldVersion,d.newVersion,d))}).catch(()=>{}),a}const Vl=["get","getKey","getAll","getAllKeys","count"],ql=["put","add","delete","clear"],Qn=new Map;function Sr(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Qn.get(e))return Qn.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,r=ql.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(r||Vl.includes(n)))return;const o=async function(s,...a){const l=this.transaction(s,r?"readwrite":"readonly");let d=l.store;return i&&(d=d.index(a.shift())),(await Promise.all([d[n](...a),r&&l.done]))[0]};return Qn.set(e,o),o}Fl(t=>({...t,get:(e,n,i)=>Sr(e,n)||t.get(e,n,i),has:(e,n)=>!!Sr(e,n)||t.has(e,n)}));class Gl{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Kl(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function Kl(t){return t.getComponent()?.type==="VERSION"}const mi="@firebase/app",$r="0.14.8";const ze=new es("@firebase/app"),Yl="@firebase/app-compat",Wl="@firebase/analytics-compat",Jl="@firebase/analytics",Ql="@firebase/app-check-compat",Xl="@firebase/app-check",Zl="@firebase/auth",ed="@firebase/auth-compat",td="@firebase/database",nd="@firebase/data-connect",id="@firebase/database-compat",rd="@firebase/functions",od="@firebase/functions-compat",sd="@firebase/installations",ad="@firebase/installations-compat",ld="@firebase/messaging",dd="@firebase/messaging-compat",cd="@firebase/performance",fd="@firebase/performance-compat",pd="@firebase/remote-config",md="@firebase/remote-config-compat",hd="@firebase/storage",ud="@firebase/storage-compat",gd="@firebase/firestore",vd="@firebase/ai",yd="@firebase/firestore-compat",bd="firebase",wd="12.9.0";const hi="[DEFAULT]",xd={[mi]:"fire-core",[Yl]:"fire-core-compat",[Jl]:"fire-analytics",[Wl]:"fire-analytics-compat",[Xl]:"fire-app-check",[Ql]:"fire-app-check-compat",[Zl]:"fire-auth",[ed]:"fire-auth-compat",[td]:"fire-rtdb",[nd]:"fire-data-connect",[id]:"fire-rtdb-compat",[rd]:"fire-fn",[od]:"fire-fn-compat",[sd]:"fire-iid",[ad]:"fire-iid-compat",[ld]:"fire-fcm",[dd]:"fire-fcm-compat",[cd]:"fire-perf",[fd]:"fire-perf-compat",[pd]:"fire-rc",[md]:"fire-rc-compat",[hd]:"fire-gcs",[ud]:"fire-gcs-compat",[gd]:"fire-fst",[yd]:"fire-fst-compat",[vd]:"fire-vertex","fire-js":"fire-js",[bd]:"fire-js-all"};const hn=new Map,_d=new Map,ui=new Map;function Er(t,e){try{t.container.addComponent(e)}catch(n){ze.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function un(t){const e=t.name;if(ui.has(e))return ze.debug(`There were multiple attempts to register component ${e}.`),!1;ui.set(e,t);for(const n of hn.values())Er(n,t);for(const n of _d.values())Er(n,t);return!0}function kd(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Td(t){return t==null?!1:t.settings!==void 0}const Cd={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},je=new Xo("app","Firebase",Cd);class Sd{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Ot("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw je.create("app-deleted",{appName:this._name})}}const $d=wd;function is(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:hi,automaticDataCollectionEnabled:!0,...e},r=i.name;if(typeof r!="string"||!r)throw je.create("bad-app-name",{appName:String(r)});if(n||(n=Jo()),!n)throw je.create("no-options");const o=hn.get(r);if(o){if(mn(n,o.options)&&mn(i,o.config))return o;throw je.create("duplicate-app",{appName:r})}const s=new Il(r);for(const l of ui.values())s.addComponent(l);const a=new Sd(n,i,s);return hn.set(r,a),a}function Ed(t=hi){const e=hn.get(t);if(!e&&t===hi&&Jo())return is();if(!e)throw je.create("no-app",{appName:t});return e}function pt(t,e,n){let i=xd[t]??t;n&&(i+=`-${n}`);const r=i.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const s=[`Unable to register library "${i}" with version "${e}":`];r&&s.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&o&&s.push("and"),o&&s.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ze.warn(s.join(" "));return}un(new Ot(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}const Nd="firebase-heartbeat-database",Id=1,Ft="firebase-heartbeat-store";let Xn=null;function rs(){return Xn||(Xn=Ul(Nd,Id,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ft)}catch(n){console.warn(n)}}}}).catch(t=>{throw je.create("idb-open",{originalErrorMessage:t.message})})),Xn}async function Dd(t){try{const n=(await rs()).transaction(Ft),i=await n.objectStore(Ft).get(os(t));return await n.done,i}catch(e){if(e instanceof Wt)ze.warn(e.message);else{const n=je.create("idb-get",{originalErrorMessage:e?.message});ze.warn(n.message)}}}async function Nr(t,e){try{const i=(await rs()).transaction(Ft,"readwrite");await i.objectStore(Ft).put(e,os(t)),await i.done}catch(n){if(n instanceof Wt)ze.warn(n.message);else{const i=je.create("idb-set",{originalErrorMessage:n?.message});ze.warn(i.message)}}}function os(t){return`${t.name}!${t.options.appId}`}const Ld=1024,zd=30;class Ad{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Md(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ir();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(r=>r.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>zd){const r=Hd(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){ze.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Ir(),{heartbeatsToSend:n,unsentEntries:i}=Pd(this._heartbeatsCache.heartbeats),r=fn(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return ze.warn(e),""}}}function Ir(){return new Date().toISOString().substring(0,10)}function Pd(t,e=Ld){const n=[];let i=t.slice();for(const r of t){const o=n.find(s=>s.agent===r.agent);if(o){if(o.dates.push(r.date),Dr(n)>e){o.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Dr(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class Md{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return vl()?yl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Dd(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Nr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Nr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Dr(t){return fn(JSON.stringify({version:2,heartbeats:t})).length}function Hd(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}function Rd(t){un(new Ot("platform-logger",e=>new Gl(e),"PRIVATE")),un(new Ot("heartbeat",e=>new Ad(e),"PRIVATE")),pt(mi,$r,t),pt(mi,$r,"esm2020"),pt("fire-js","")}Rd("");var Od="firebase",Fd="12.9.0";pt(Od,Fd,"app");var Lr={};const zr="@firebase/database",Ar="1.1.0";let ss="";function as(t){ss=t}class Bd{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ne(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Rt(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}class jd{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return ke(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}const ls=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Bd(e)}}catch{}return new jd},Ze=ls("localStorage"),Ud=ls("sessionStorage");const mt=new es("@firebase/database"),ds=(function(){let t=1;return function(){return t++}})(),cs=function(t){const e=Sl(t),n=new Cl;n.update(e);const i=n.digest();return Di.encodeByteArray(i)},Jt=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Jt.apply(null,i):typeof i=="object"?e+=ne(i):e+=i,e+=" "}return e};let zt=null,Pr=!0;const Vd=function(t,e){C(!0,"Can't turn on custom loggers persistently."),mt.logLevel=G.VERBOSE,zt=mt.log.bind(mt)},se=function(...t){if(Pr===!0&&(Pr=!1,zt===null&&Ud.get("logging_enabled")===!0&&Vd()),zt){const e=Jt.apply(null,t);zt(e)}},Qt=function(t){return function(...e){se(t,...e)}},gi=function(...t){const e="FIREBASE INTERNAL ERROR: "+Jt(...t);mt.error(e)},Ae=function(...t){const e=`FIREBASE FATAL ERROR: ${Jt(...t)}`;throw mt.error(e),new Error(e)},he=function(...t){const e="FIREBASE WARNING: "+Jt(...t);mt.warn(e)},qd=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&he("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Ln=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},Gd=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},gt="[MIN_NAME]",tt="[MAX_NAME]",ot=function(t,e){if(t===e)return 0;if(t===gt||e===tt)return-1;if(e===gt||t===tt)return 1;{const n=Mr(t),i=Mr(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},Kd=function(t,e){return t===e?0:t<e?-1:1},Et=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+ne(e))},Ai=function(t){if(typeof t!="object"||t===null)return ne(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=ne(e[i]),n+=":",n+=Ai(t[e[i]]);return n+="}",n},fs=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let r=0;r<n;r+=e)r+e>n?i.push(t.substring(r,n)):i.push(t.substring(r,r+e));return i};function ae(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const ps=function(t){C(!Ln(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let r,o,s,a,l;t===0?(o=0,s=0,r=1/t===-1/0?1:0):(r=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),o=a+i,s=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(o=0,s=Math.round(t/Math.pow(2,1-i-n))));const d=[];for(l=n;l;l-=1)d.push(s%2?1:0),s=Math.floor(s/2);for(l=e;l;l-=1)d.push(o%2?1:0),o=Math.floor(o/2);d.push(r?1:0),d.reverse();const p=d.join("");let c="";for(l=0;l<64;l+=8){let f=parseInt(p.substr(l,8),2).toString(16);f.length===1&&(f="0"+f),c=c+f}return c.toLowerCase()},Yd=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Wd=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Jd(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const Qd=new RegExp("^-?(0*)\\d{1,10}$"),Xd=-2147483648,Zd=2147483647,Mr=function(t){if(Qd.test(t)){const e=Number(t);if(e>=Xd&&e<=Zd)return e}return null},kt=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw he("Exception was thrown by user callback.",n),e},Math.floor(0))}},ec=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},At=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};class tc{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,Td(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){he(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}class nc{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(r=>this.auth_=r)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(se("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',he(e)}}class dn{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}dn.OWNER="owner";const Pi="5",ms="v",hs="s",us="r",gs="f",vs=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,ys="ls",bs="p",vi="ac",ws="websocket",xs="long_polling";class _s{constructor(e,n,i,r,o=!1,s="",a=!1,l=!1,d=null){this.secure=n,this.namespace=i,this.webSocketOnly=r,this.nodeAdmin=o,this.persistenceKey=s,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=d,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Ze.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Ze.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function ic(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function ks(t,e,n){C(typeof e=="string","typeof type must == string"),C(typeof n=="object","typeof params must == object");let i;if(e===ws)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===xs)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);ic(t)&&(n.ns=t.namespace);const r=[];return ae(n,(o,s)=>{r.push(o+"="+s)}),i+r.join("&")}class rc{constructor(){this.counters_={}}incrementCounter(e,n=1){ke(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return tl(this.counters_)}}const Zn={},ei={};function Mi(t){const e=t.toString();return Zn[e]||(Zn[e]=new rc),Zn[e]}function oc(t,e){const n=t.toString();return ei[n]||(ei[n]=e()),ei[n]}class sc{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let r=0;r<i.length;++r)i[r]&&kt(()=>{this.onMessage_(i[r])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}const Hr="start",ac="close",lc="pLPCommand",dc="pRTLPCB",Ts="id",Cs="pw",Ss="ser",cc="cb",fc="seg",pc="ts",mc="d",hc="dframe",$s=1870,Es=30,uc=$s-Es,gc=25e3,vc=3e4;class ct{constructor(e,n,i,r,o,s,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=r,this.authToken=o,this.transportSessionId=s,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Qt(e),this.stats_=Mi(n),this.urlFn=l=>(this.appCheckToken&&(l[vi]=this.appCheckToken),ks(n,xs,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new sc(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(vc)),Gd(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Hi((...o)=>{const[s,a,l,d,p]=o;if(this.incrementIncomingBytes_(o),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,s===Hr)this.id=a,this.password=l;else if(s===ac)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+s)},(...o)=>{const[s,a]=o;this.incrementIncomingBytes_(o),this.myPacketOrderer.handleResponse(s,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Hr]="t",i[Ss]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[cc]=this.scriptTagHolder.uniqueCallbackIdentifier),i[ms]=Pi,this.transportSessionId&&(i[hs]=this.transportSessionId),this.lastSessionId&&(i[ys]=this.lastSessionId),this.applicationId&&(i[bs]=this.applicationId),this.appCheckToken&&(i[vi]=this.appCheckToken),typeof location<"u"&&location.hostname&&vs.test(location.hostname)&&(i[us]=gs);const r=this.urlFn(i);this.log_("Connecting via long-poll to "+r),this.scriptTagHolder.addTag(r,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){ct.forceAllow_=!0}static forceDisallow(){ct.forceDisallow_=!0}static isAvailable(){return ct.forceAllow_?!0:!ct.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Yd()&&!Wd()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=ne(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Ko(n),r=fs(i,uc);for(let o=0;o<r.length;o++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[o]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[hc]="t",i[Ts]=e,i[Cs]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=ne(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Hi{constructor(e,n,i,r){this.onDisconnect=i,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=ds(),window[lc+this.uniqueCallbackIdentifier]=e,window[dc+this.uniqueCallbackIdentifier]=n,this.myIFrame=Hi.createIFrame_();let o="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(o='<script>document.domain="'+document.domain+'";<\/script>');const s="<html><body>"+o+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(s),this.myIFrame.doc.close()}catch(a){se("frame writing exception"),a.stack&&se(a.stack),se(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||se("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Ts]=this.myID,e[Cs]=this.myPW,e[Ss]=this.currentSerial;let n=this.urlFn(e),i="",r=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Es+i.length<=$s;){const s=this.pendingSegs.shift();i=i+"&"+fc+r+"="+s.seg+"&"+pc+r+"="+s.ts+"&"+mc+r+"="+s.d,r++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},r=setTimeout(i,Math.floor(gc)),o=()=>{clearTimeout(r),i()};this.addTag(e,o)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const r=i.readyState;(!r||r==="loaded"||r==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{se("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}const yc=16384,bc=45e3;let gn=null;typeof MozWebSocket<"u"?gn=MozWebSocket:typeof WebSocket<"u"&&(gn=WebSocket);class we{constructor(e,n,i,r,o,s,a){this.connId=e,this.applicationId=i,this.appCheckToken=r,this.authToken=o,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Qt(this.connId),this.stats_=Mi(n),this.connURL=we.connectionURL_(n,s,a,r,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,r,o){const s={};return s[ms]=Pi,typeof location<"u"&&location.hostname&&vs.test(location.hostname)&&(s[us]=gs),n&&(s[hs]=n),i&&(s[ys]=i),r&&(s[vi]=r),o&&(s[bs]=o),ks(e,ws,s)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Ze.set("previous_websocket_failure",!0);try{let i;gl(),this.mySock=new gn(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const r=i.message||i.data;r&&this.log_(r),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const r=i.message||i.data;r&&this.log_(r),this.onClosed_()}}start(){}static forceDisallow(){we.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&gn!==null&&!we.forceDisallow_}static previouslyFailed(){return Ze.isInMemoryStorage||Ze.get("previous_websocket_failure")===!0}markConnectionHealthy(){Ze.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=Rt(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(C(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=ne(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=fs(n,yc);i.length>1&&this.sendString_(String(i.length));for(let r=0;r<i.length;r++)this.sendString_(i[r])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(bc))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}we.responsesRequiredToBeHealthy=2;we.healthyTimeout=3e4;class Bt{static get ALL_TRANSPORTS(){return[ct,we]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=we&&we.isAvailable();let i=n&&!we.previouslyFailed();if(e.webSocketOnly&&(n||he("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[we];else{const r=this.transports_=[];for(const o of Bt.ALL_TRANSPORTS)o&&o.isAvailable()&&r.push(o);Bt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Bt.globalTransportInitialized_=!1;const wc=6e4,xc=5e3,_c=10*1024,kc=100*1024,ti="t",Rr="d",Tc="s",Or="r",Cc="e",Fr="o",Br="a",jr="n",Ur="p",Sc="h";class $c{constructor(e,n,i,r,o,s,a,l,d,p){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=r,this.authToken_=o,this.onMessage_=s,this.onReady_=a,this.onDisconnect_=l,this.onKill_=d,this.lastSessionId=p,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Qt("c:"+this.id+":"),this.transportManager_=new Bt(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=At(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>kc?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>_c?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(ti in e){const n=e[ti];n===Br?this.upgradeIfSecondaryHealthy_():n===Or?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Fr&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Et("t",e),i=Et("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Ur,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Br,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:jr,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Et("t",e),i=Et("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Et(ti,e);if(Rr in e){const i=e[Rr];if(n===Sc){const r={...i};this.repoInfo_.isUsingEmulator&&(r.h=this.repoInfo_.host),this.onHandshake_(r)}else if(n===jr){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let r=0;r<this.pendingDataMessages.length;++r)this.onDataMessage_(this.pendingDataMessages[r]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===Tc?this.onConnectionShutdown_(i):n===Or?this.onReset_(i):n===Cc?gi("Server Error: "+i):n===Fr?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):gi("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Pi!==i&&he("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),At(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(wc))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):At(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(xc))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Ur,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Ze.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}class Ns{put(e,n,i,r){}merge(e,n,i,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}class Is{constructor(e){this.allowedEvents_=e,this.listeners_={},C(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let r=0;r<i.length;r++)i[r].callback.apply(i[r].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const r=this.getInitialEvent(e);r&&n.apply(i,r)}off(e,n,i){this.validateEventType_(e);const r=this.listeners_[e]||[];for(let o=0;o<r.length;o++)if(r[o].callback===n&&(!i||i===r[o].context)){r.splice(o,1);return}}validateEventType_(e){C(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}class vn extends Is{static getInstance(){return new vn}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Qo()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return C(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}const Vr=32,qr=768;class U{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let r=0;r<this.pieces_.length;r++)this.pieces_[r].length>0&&(this.pieces_[i]=this.pieces_[r],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function F(){return new U("")}function M(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function qe(t){return t.pieces_.length-t.pieceNum_}function V(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new U(t.pieces_,e)}function Ri(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function Ec(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function jt(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Ds(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new U(e,0)}function W(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof U)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let r=0;r<i.length;r++)i[r].length>0&&n.push(i[r])}return new U(n,0)}function H(t){return t.pieceNum_>=t.pieces_.length}function me(t,e){const n=M(t),i=M(e);if(n===null)return e;if(n===i)return me(V(t),V(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function Nc(t,e){const n=jt(t,0),i=jt(e,0);for(let r=0;r<n.length&&r<i.length;r++){const o=ot(n[r],i[r]);if(o!==0)return o}return n.length===i.length?0:n.length<i.length?-1:1}function Oi(t,e){if(qe(t)!==qe(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function ye(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(qe(t)>qe(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class Ic{constructor(e,n){this.errorPrefix_=n,this.parts_=jt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Dn(this.parts_[i]);Ls(this)}}function Dc(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Dn(e),Ls(t)}function Lc(t){const e=t.parts_.pop();t.byteLength_-=Dn(e),t.parts_.length>0&&(t.byteLength_-=1)}function Ls(t){if(t.byteLength_>qr)throw new Error(t.errorPrefix_+"has a key path longer than "+qr+" bytes ("+t.byteLength_+").");if(t.parts_.length>Vr)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Vr+") or object contains a cycle "+Xe(t))}function Xe(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}class Fi extends Is{static getInstance(){return new Fi}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return C(e==="visible","Unknown event type: "+e),[this.visible_]}}const Nt=1e3,zc=300*1e3,Gr=30*1e3,Ac=1.3,Pc=3e4,Mc="server_kill",Kr=3;class Le extends Ns{constructor(e,n,i,r,o,s,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=r,this.onServerInfoUpdate_=o,this.authTokenProvider_=s,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Le.nextPersistentConnectionId_++,this.log_=Qt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Nt,this.maxReconnectDelay_=zc,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Fi.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&vn.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const r=++this.requestNumber_,o={r,a:e,b:n};this.log_(ne(o)),C(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(o),i&&(this.requestCBHash_[r]=i)}get(e){this.initConnection_();const n=new be,r={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:s=>{const a=s.d;s.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(r),this.outstandingGetCount_++;const o=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(o),n.promise}listen(e,n,i,r){this.initConnection_();const o=e._queryIdentifier,s=e._path.toString();this.log_("Listen called for "+s+" "+o),this.listens.has(s)||this.listens.set(s,new Map),C(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),C(!this.listens.get(s).has(o),"listen() called twice for same path/queryId.");const a={onComplete:r,hashFn:n,query:e,tag:i};this.listens.get(s).set(o,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),r=n._queryIdentifier;this.log_("Listen on "+i+" for "+r);const o={p:i},s="q";e.tag&&(o.q=n._queryObject,o.t=e.tag),o.h=e.hashFn(),this.sendRequest(s,o,a=>{const l=a.d,d=a.s;Le.warnOnListenWarnings_(l,n),(this.listens.get(i)&&this.listens.get(i).get(r))===e&&(this.log_("listen response",a),d!=="ok"&&this.removeListen_(i,r),e.onComplete&&e.onComplete(d,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&ke(e,"w")){const i=et(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const r='".indexOn": "'+n._queryParams.getIndex().toString()+'"',o=n._path.toString();he(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${r} at ${o} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||kl(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Gr)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=_l(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,r=>{const o=r.s,s=r.d||"error";this.authToken_===e&&(o==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(o,s))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+r),C(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,r)&&this.connected_&&this.sendUnlisten_(i,r,e._queryObject,n)}sendUnlisten_(e,n,i,r){this.log_("Unlisten on "+e+" for "+n);const o={p:e},s="n";r&&(o.q=i,o.t=r),this.sendRequest(s,o)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,r){const o={p:n,d:i};this.log_("onDisconnect "+e,o),this.sendRequest(e,o,s=>{r&&setTimeout(()=>{r(s.s,s.d)},Math.floor(0))})}put(e,n,i,r){this.putInternal("p",e,n,i,r)}merge(e,n,i,r){this.putInternal("m",e,n,i,r)}putInternal(e,n,i,r,o){this.initConnection_();const s={p:n,d:i};o!==void 0&&(s.h=o),this.outstandingPuts_.push({action:e,request:s,onComplete:r}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,o=>{this.log_(n+" response",o),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),r&&r(o.s,o.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const o=i.d;this.log_("reportStats","Error sending stats: "+o)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ne(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):gi("Unrecognized action received from server: "+ne(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){C(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Nt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Nt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Pc&&(this.reconnectDelay_=Nt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Ac)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+Le.nextConnectionId_++,o=this.lastSessionId;let s=!1,a=null;const l=function(){a?a.close():(s=!0,i())},d=function(c){C(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(c)};this.realtime_={close:l,sendRequest:d};const p=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[c,f]=await Promise.all([this.authTokenProvider_.getToken(p),this.appCheckTokenProvider_.getToken(p)]);s?se("getToken() completed but was canceled"):(se("getToken() completed. Creating connection."),this.authToken_=c&&c.accessToken,this.appCheckToken_=f&&f.token,a=new $c(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,u=>{he(u+" ("+this.repoInfo_.toString()+")"),this.interrupt(Mc)},o))}catch(c){this.log_("Failed to get token: "+c),s||(this.repoInfo_.nodeAdmin&&he(c),l())}}}interrupt(e){se("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){se("Resuming connection for reason: "+e),delete this.interruptReasons_[e],ci(this.interruptReasons_)&&(this.reconnectDelay_=Nt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(o=>Ai(o)).join("$"):i="default";const r=this.removeListen_(e,i);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,n){const i=new U(e).toString();let r;if(this.listens.has(i)){const o=this.listens.get(i);r=o.get(n),o.delete(n),o.size===0&&this.listens.delete(i)}else r=void 0;return r}onAuthRevoked_(e,n){se("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Kr&&(this.reconnectDelay_=Gr,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){se("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Kr&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+ss.replace(/\./g,"-")]=1,Qo()?e["framework.cordova"]=1:ul()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=vn.getInstance().currentlyOnline();return ci(this.interruptReasons_)&&e}}Le.nextPersistentConnectionId_=0;Le.nextConnectionId_=0;class R{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new R(e,n)}}class zn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new R(gt,e),r=new R(gt,n);return this.compare(i,r)!==0}minPost(){return R.MIN}}let sn;class zs extends zn{static get __EMPTY_NODE(){return sn}static set __EMPTY_NODE(e){sn=e}compare(e,n){return ot(e.name,n.name)}isDefinedOn(e){throw _t("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return R.MIN}maxPost(){return new R(tt,sn)}makePost(e,n){return C(typeof e=="string","KeyIndex indexValue must always be a string."),new R(e,sn)}toString(){return".key"}}const ht=new zs;class an{constructor(e,n,i,r,o=null){this.isReverse_=r,this.resultGenerator_=o,this.nodeStack_=[];let s=1;for(;!e.isEmpty();)if(e=e,s=n?i(e.key,n):1,r&&(s*=-1),s<0)this.isReverse_?e=e.left:e=e.right;else if(s===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class oe{constructor(e,n,i,r,o){this.key=e,this.value=n,this.color=i??oe.RED,this.left=r??ue.EMPTY_NODE,this.right=o??ue.EMPTY_NODE}copy(e,n,i,r,o){return new oe(e??this.key,n??this.value,i??this.color,r??this.left,o??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let r=this;const o=i(e,r.key);return o<0?r=r.copy(null,null,null,r.left.insert(e,n,i),null):o===0?r=r.copy(null,n,null,null,null):r=r.copy(null,null,null,null,r.right.insert(e,n,i)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return ue.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,r;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return ue.EMPTY_NODE;r=i.right.min_(),i=i.copy(r.key,r.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,oe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,oe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}oe.RED=!0;oe.BLACK=!1;class Hc{copy(e,n,i,r,o){return this}insert(e,n,i){return new oe(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class ue{constructor(e,n=ue.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new ue(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,oe.BLACK,null,null))}remove(e){return new ue(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,oe.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,r=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return r?r.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(r=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new an(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new an(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new an(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new an(this.root_,null,this.comparator_,!0,e)}}ue.EMPTY_NODE=new Hc;function Rc(t,e){return ot(t.name,e.name)}function Bi(t,e){return ot(t,e)}let yi;function Oc(t){yi=t}const As=function(t){return typeof t=="number"?"number:"+ps(t):"string:"+t},Ps=function(t){if(t.isLeafNode()){const e=t.val();C(typeof e=="string"||typeof e=="number"||typeof e=="object"&&ke(e,".sv"),"Priority must be a string or number.")}else C(t===yi||t.isEmpty(),"priority of unexpected type.");C(t===yi||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};let Yr;class re{static set __childrenNodeConstructor(e){Yr=e}static get __childrenNodeConstructor(){return Yr}constructor(e,n=re.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,C(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Ps(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new re(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:re.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return H(e)?this:M(e)===".priority"?this.priorityNode_:re.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:re.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=M(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(C(i!==".priority"||qe(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,re.__childrenNodeConstructor.EMPTY_NODE.updateChild(V(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+As(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=ps(this.value_):e+=this.value_,this.lazyHash_=cs(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===re.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof re.__childrenNodeConstructor?-1:(C(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,r=re.VALUE_TYPE_ORDER.indexOf(n),o=re.VALUE_TYPE_ORDER.indexOf(i);return C(r>=0,"Unknown leaf type: "+n),C(o>=0,"Unknown leaf type: "+i),r===o?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:o-r}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}re.VALUE_TYPE_ORDER=["object","boolean","number","string"];let Ms,Hs;function Fc(t){Ms=t}function Bc(t){Hs=t}class jc extends zn{compare(e,n){const i=e.node.getPriority(),r=n.node.getPriority(),o=i.compareTo(r);return o===0?ot(e.name,n.name):o}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return R.MIN}maxPost(){return new R(tt,new re("[PRIORITY-POST]",Hs))}makePost(e,n){const i=Ms(e);return new R(n,new re("[PRIORITY-POST]",i))}toString(){return".priority"}}const K=new jc;const Uc=Math.log(2);class Vc{constructor(e){const n=o=>parseInt(Math.log(o)/Uc,10),i=o=>parseInt(Array(o+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const r=i(this.count);this.bits_=e+1&r}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const yn=function(t,e,n,i){t.sort(e);const r=function(l,d){const p=d-l;let c,f;if(p===0)return null;if(p===1)return c=t[l],f=n?n(c):c,new oe(f,c.node,oe.BLACK,null,null);{const u=parseInt(p/2,10)+l,h=r(l,u),v=r(u+1,d);return c=t[u],f=n?n(c):c,new oe(f,c.node,oe.BLACK,h,v)}},o=function(l){let d=null,p=null,c=t.length;const f=function(h,v){const g=c-h,_=c;c-=h;const b=r(g+1,_),y=t[g],x=n?n(y):y;u(new oe(x,y.node,v,null,b))},u=function(h){d?(d.left=h,d=h):(p=h,d=h)};for(let h=0;h<l.count;++h){const v=l.nextBitIsOne(),g=Math.pow(2,l.count-(h+1));v?f(g,oe.BLACK):(f(g,oe.BLACK),f(g,oe.RED))}return p},s=new Vc(t.length),a=o(s);return new ue(i||e,a)};let ni;const dt={};class De{static get Default(){return C(dt&&K,"ChildrenNode.ts has not been loaded"),ni=ni||new De({".priority":dt},{".priority":K}),ni}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=et(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof ue?n:null}hasIndex(e){return ke(this.indexSet_,e.toString())}addIndex(e,n){C(e!==ht,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let r=!1;const o=n.getIterator(R.Wrap);let s=o.getNext();for(;s;)r=r||e.isDefinedOn(s.node),i.push(s),s=o.getNext();let a;r?a=yn(i,e.getCompare()):a=dt;const l=e.toString(),d={...this.indexSet_};d[l]=e;const p={...this.indexes_};return p[l]=a,new De(p,d)}addToIndexes(e,n){const i=pn(this.indexes_,(r,o)=>{const s=et(this.indexSet_,o);if(C(s,"Missing index implementation for "+o),r===dt)if(s.isDefinedOn(e.node)){const a=[],l=n.getIterator(R.Wrap);let d=l.getNext();for(;d;)d.name!==e.name&&a.push(d),d=l.getNext();return a.push(e),yn(a,s.getCompare())}else return dt;else{const a=n.get(e.name);let l=r;return a&&(l=l.remove(new R(e.name,a))),l.insert(e,e.node)}});return new De(i,this.indexSet_)}removeFromIndexes(e,n){const i=pn(this.indexes_,r=>{if(r===dt)return r;{const o=n.get(e.name);return o?r.remove(new R(e.name,o)):r}});return new De(i,this.indexSet_)}}let It;class L{static get EMPTY_NODE(){return It||(It=new L(new ue(Bi),null,De.Default))}constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Ps(this.priorityNode_),this.children_.isEmpty()&&C(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||It}updatePriority(e){return this.children_.isEmpty()?this:new L(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?It:n}}getChild(e){const n=M(e);return n===null?this:this.getImmediateChild(n).getChild(V(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(C(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new R(e,n);let r,o;n.isEmpty()?(r=this.children_.remove(e),o=this.indexMap_.removeFromIndexes(i,this.children_)):(r=this.children_.insert(e,n),o=this.indexMap_.addToIndexes(i,this.children_));const s=r.isEmpty()?It:this.priorityNode_;return new L(r,s,o)}}updateChild(e,n){const i=M(e);if(i===null)return n;{C(M(e)!==".priority"||qe(e)===1,".priority must be the last token in a path");const r=this.getImmediateChild(i).updateChild(V(e),n);return this.updateImmediateChild(i,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,r=0,o=!0;if(this.forEachChild(K,(s,a)=>{n[s]=a.val(e),i++,o&&L.INTEGER_REGEXP_.test(s)?r=Math.max(r,Number(s)):o=!1}),!e&&o&&r<2*i){const s=[];for(const a in n)s[a]=n[a];return s}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+As(this.getPriority().val())+":"),this.forEachChild(K,(n,i)=>{const r=i.hash();r!==""&&(e+=":"+n+":"+r)}),this.lazyHash_=e===""?"":cs(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const r=this.resolveIndex_(i);if(r){const o=r.getPredecessorKey(new R(e,n));return o?o.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new R(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new R(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(r=>n(r.name,r.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,r=>r);{const r=this.children_.getIteratorFrom(e.name,R.Wrap);let o=r.peek();for(;o!=null&&n.compare(o,e)<0;)r.getNext(),o=r.peek();return r}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,r=>r);{const r=this.children_.getReverseIteratorFrom(e.name,R.Wrap);let o=r.peek();for(;o!=null&&n.compare(o,e)>0;)r.getNext(),o=r.peek();return r}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Xt?-1:0}withIndex(e){if(e===ht||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new L(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===ht||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(K),r=n.getIterator(K);let o=i.getNext(),s=r.getNext();for(;o&&s;){if(o.name!==s.name||!o.node.equals(s.node))return!1;o=i.getNext(),s=r.getNext()}return o===null&&s===null}else return!1;else return!1}}resolveIndex_(e){return e===ht?null:this.indexMap_.get(e.toString())}}L.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class qc extends L{constructor(){super(new ue(Bi),L.EMPTY_NODE,De.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return L.EMPTY_NODE}isEmpty(){return!1}}const Xt=new qc;Object.defineProperties(R,{MIN:{value:new R(gt,L.EMPTY_NODE)},MAX:{value:new R(tt,Xt)}});zs.__EMPTY_NODE=L.EMPTY_NODE;re.__childrenNodeConstructor=L;Oc(Xt);Bc(Xt);const Gc=!0;function Y(t,e=null){if(t===null)return L.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),C(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new re(n,Y(e))}if(!(t instanceof Array)&&Gc){const n=[];let i=!1;if(ae(t,(s,a)=>{if(s.substring(0,1)!=="."){const l=Y(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),n.push(new R(s,l)))}}),n.length===0)return L.EMPTY_NODE;const o=yn(n,Rc,s=>s.name,Bi);if(i){const s=yn(n,K.getCompare());return new L(o,Y(e),new De({".priority":s},{".priority":K}))}else return new L(o,Y(e),De.Default)}else{let n=L.EMPTY_NODE;return ae(t,(i,r)=>{if(ke(t,i)&&i.substring(0,1)!=="."){const o=Y(r);(o.isLeafNode()||!o.isEmpty())&&(n=n.updateImmediateChild(i,o))}}),n.updatePriority(Y(e))}}Fc(Y);class Kc extends zn{constructor(e){super(),this.indexPath_=e,C(!H(e)&&M(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),r=this.extractChild(n.node),o=i.compareTo(r);return o===0?ot(e.name,n.name):o}makePost(e,n){const i=Y(e),r=L.EMPTY_NODE.updateChild(this.indexPath_,i);return new R(n,r)}maxPost(){const e=L.EMPTY_NODE.updateChild(this.indexPath_,Xt);return new R(tt,e)}toString(){return jt(this.indexPath_,0).join("/")}}class Yc extends zn{compare(e,n){const i=e.node.compareTo(n.node);return i===0?ot(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return R.MIN}maxPost(){return R.MAX}makePost(e,n){const i=Y(e);return new R(n,i)}toString(){return".value"}}const Wc=new Yc;function Rs(t){return{type:"value",snapshotNode:t}}function vt(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Ut(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Vt(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function Jc(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}class ji{constructor(e){this.index_=e}updateChild(e,n,i,r,o,s){C(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(r).equals(i.getChild(r))&&a.isEmpty()===i.isEmpty()||(s!=null&&(i.isEmpty()?e.hasChild(n)?s.trackChildChange(Ut(n,a)):C(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?s.trackChildChange(vt(n,i)):s.trackChildChange(Vt(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(K,(r,o)=>{n.hasChild(r)||i.trackChildChange(Ut(r,o))}),n.isLeafNode()||n.forEachChild(K,(r,o)=>{if(e.hasChild(r)){const s=e.getImmediateChild(r);s.equals(o)||i.trackChildChange(Vt(r,o,s))}else i.trackChildChange(vt(r,o))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?L.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}class qt{constructor(e){this.indexedFilter_=new ji(e.getIndex()),this.index_=e.getIndex(),this.startPost_=qt.getStartPost_(e),this.endPost_=qt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,r,o,s){return this.matches(new R(n,i))||(i=L.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,r,o,s)}updateFullNode(e,n,i){n.isLeafNode()&&(n=L.EMPTY_NODE);let r=n.withIndex(this.index_);r=r.updatePriority(L.EMPTY_NODE);const o=this;return n.forEachChild(K,(s,a)=>{o.matches(new R(s,a))||(r=r.updateImmediateChild(s,L.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,r,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}class Qc{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new qt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,r,o,s){return this.rangedFilter_.matches(new R(n,i))||(i=L.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,r,o,s):this.fullLimitUpdateChild_(e,n,i,o,s)}updateFullNode(e,n,i){let r;if(n.isLeafNode()||n.isEmpty())r=L.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){r=L.EMPTY_NODE.withIndex(this.index_);let o;this.reverse_?o=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):o=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let s=0;for(;o.hasNext()&&s<this.limit_;){const a=o.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))r=r.updateImmediateChild(a.name,a.node),s++;else break;else continue}}else{r=n.withIndex(this.index_),r=r.updatePriority(L.EMPTY_NODE);let o;this.reverse_?o=r.getReverseIterator(this.index_):o=r.getIterator(this.index_);let s=0;for(;o.hasNext();){const a=o.getNext();s<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?s++:r=r.updateImmediateChild(a.name,L.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,r,o){let s;if(this.reverse_){const c=this.index_.getCompare();s=(f,u)=>c(u,f)}else s=this.index_.getCompare();const a=e;C(a.numChildren()===this.limit_,"");const l=new R(n,i),d=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),p=this.rangedFilter_.matches(l);if(a.hasChild(n)){const c=a.getImmediateChild(n);let f=r.getChildAfterChild(this.index_,d,this.reverse_);for(;f!=null&&(f.name===n||a.hasChild(f.name));)f=r.getChildAfterChild(this.index_,f,this.reverse_);const u=f==null?1:s(f,l);if(p&&!i.isEmpty()&&u>=0)return o?.trackChildChange(Vt(n,i,c)),a.updateImmediateChild(n,i);{o?.trackChildChange(Ut(n,c));const v=a.updateImmediateChild(n,L.EMPTY_NODE);return f!=null&&this.rangedFilter_.matches(f)?(o?.trackChildChange(vt(f.name,f.node)),v.updateImmediateChild(f.name,f.node)):v}}else return i.isEmpty()?e:p&&s(d,l)>=0?(o!=null&&(o.trackChildChange(Ut(d.name,d.node)),o.trackChildChange(vt(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(d.name,L.EMPTY_NODE)):e}}class An{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=K}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return C(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return C(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:gt}hasEnd(){return this.endSet_}getIndexEndValue(){return C(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return C(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:tt}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return C(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===K}copy(){const e=new An;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Xc(t){return t.loadsAllData()?new ji(t.getIndex()):t.hasLimit()?new Qc(t):new qt(t)}function Wr(t){const e={};if(t.isDefault())return e;let n;if(t.index_===K?n="$priority":t.index_===Wc?n="$value":t.index_===ht?n="$key":(C(t.index_ instanceof Kc,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=ne(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=ne(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+ne(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=ne(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+ne(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Jr(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==K&&(e.i=t.index_.toString()),e}class bn extends Ns{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(C(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,i,r){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=r,this.log_=Qt("p:rest:"),this.listens_={}}listen(e,n,i,r){const o=e._path.toString();this.log_("Listen called for "+o+" "+e._queryIdentifier);const s=bn.getListenId_(e,i),a={};this.listens_[s]=a;const l=Wr(e._queryParams);this.restRequest_(o+".json",l,(d,p)=>{let c=p;if(d===404&&(c=null,d=null),d===null&&this.onDataUpdate_(o,c,!1,i),et(this.listens_,s)===a){let f;d?d===401?f="permission_denied":f="rest_error:"+d:f="ok",r(f,null)}})}unlisten(e,n){const i=bn.getListenId_(e,n);delete this.listens_[i]}get(e){const n=Wr(e._queryParams),i=e._path.toString(),r=new be;return this.restRequest_(i+".json",n,(o,s)=>{let a=s;o===404&&(a=null,o=null),o===null?(this.onDataUpdate_(i,a,!1,null),r.resolve(a)):r.reject(new Error(a))}),r.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([r,o])=>{r&&r.accessToken&&(n.auth=r.accessToken),o&&o.token&&(n.ac=o.token);const s=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Tl(n);this.log_("Sending REST request for "+s);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+s+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Rt(a.responseText)}catch{he("Failed to parse JSON response for "+s+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&he("Got unsuccessful REST response for "+s+" Status: "+a.status),i(a.status);i=null}},a.open("GET",s,!0),a.send()})}}class Zc{constructor(){this.rootNode_=L.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}function wn(){return{value:null,children:new Map}}function Tt(t,e,n){if(H(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=M(e);t.children.has(i)||t.children.set(i,wn());const r=t.children.get(i);e=V(e),Tt(r,e,n)}}function bi(t,e){if(H(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(K,(i,r)=>{Tt(t,new U(i),r)}),bi(t,e)}}else if(t.children.size>0){const n=M(e);return e=V(e),t.children.has(n)&&bi(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function wi(t,e,n){t.value!==null?n(e,t.value):ef(t,(i,r)=>{const o=new U(e.toString()+"/"+i);wi(r,o,n)})}function ef(t,e){t.children.forEach((n,i)=>{e(i,n)})}class tf{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&ae(this.last_,(i,r)=>{n[i]=n[i]-r}),this.last_=e,n}}const Qr=10*1e3,nf=30*1e3,rf=300*1e3;class of{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new tf(e);const i=Qr+(nf-Qr)*Math.random();At(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;ae(e,(r,o)=>{o>0&&ke(this.statsToReport_,r)&&(n[r]=o,i=!0)}),i&&this.server_.reportStats(n),At(this.reportStats_.bind(this),Math.floor(Math.random()*2*rf))}}var xe;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(xe||(xe={}));function Ui(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Vi(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function qi(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}class xn{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=xe.ACK_USER_WRITE,this.source=Ui()}operationForChild(e){if(H(this.path)){if(this.affectedTree.value!=null)return C(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new U(e));return new xn(F(),n,this.revert)}}else return C(M(this.path)===e,"operationForChild called for unrelated child."),new xn(V(this.path),this.affectedTree,this.revert)}}class Gt{constructor(e,n){this.source=e,this.path=n,this.type=xe.LISTEN_COMPLETE}operationForChild(e){return H(this.path)?new Gt(this.source,F()):new Gt(this.source,V(this.path))}}class nt{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=xe.OVERWRITE}operationForChild(e){return H(this.path)?new nt(this.source,F(),this.snap.getImmediateChild(e)):new nt(this.source,V(this.path),this.snap)}}class yt{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=xe.MERGE}operationForChild(e){if(H(this.path)){const n=this.children.subtree(new U(e));return n.isEmpty()?null:n.value?new nt(this.source,F(),n.value):new yt(this.source,F(),n)}else return C(M(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new yt(this.source,V(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}class Ge{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(H(e))return this.isFullyInitialized()&&!this.filtered_;const n=M(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}class sf{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function af(t,e,n,i){const r=[],o=[];return e.forEach(s=>{s.type==="child_changed"&&t.index_.indexedValueChanged(s.oldSnap,s.snapshotNode)&&o.push(Jc(s.childName,s.snapshotNode))}),Dt(t,r,"child_removed",e,i,n),Dt(t,r,"child_added",e,i,n),Dt(t,r,"child_moved",o,i,n),Dt(t,r,"child_changed",e,i,n),Dt(t,r,"value",e,i,n),r}function Dt(t,e,n,i,r,o){const s=i.filter(a=>a.type===n);s.sort((a,l)=>df(t,a,l)),s.forEach(a=>{const l=lf(t,a,o);r.forEach(d=>{d.respondsTo(a.type)&&e.push(d.createEvent(l,t.query_))})})}function lf(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function df(t,e,n){if(e.childName==null||n.childName==null)throw _t("Should only compare child_ events.");const i=new R(e.childName,e.snapshotNode),r=new R(n.childName,n.snapshotNode);return t.index_.compare(i,r)}function Pn(t,e){return{eventCache:t,serverCache:e}}function Pt(t,e,n,i){return Pn(new Ge(e,n,i),t.serverCache)}function Os(t,e,n,i){return Pn(t.eventCache,new Ge(e,n,i))}function _n(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function it(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}let ii;const cf=()=>(ii||(ii=new ue(Kd)),ii);class q{static fromObject(e){let n=new q(null);return ae(e,(i,r)=>{n=n.set(new U(i),r)}),n}constructor(e,n=cf()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:F(),value:this.value};if(H(e))return null;{const i=M(e),r=this.children.get(i);if(r!==null){const o=r.findRootMostMatchingPathAndValue(V(e),n);return o!=null?{path:W(new U(i),o.path),value:o.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(H(e))return this;{const n=M(e),i=this.children.get(n);return i!==null?i.subtree(V(e)):new q(null)}}set(e,n){if(H(e))return new q(n,this.children);{const i=M(e),o=(this.children.get(i)||new q(null)).set(V(e),n),s=this.children.insert(i,o);return new q(this.value,s)}}remove(e){if(H(e))return this.children.isEmpty()?new q(null):new q(null,this.children);{const n=M(e),i=this.children.get(n);if(i){const r=i.remove(V(e));let o;return r.isEmpty()?o=this.children.remove(n):o=this.children.insert(n,r),this.value===null&&o.isEmpty()?new q(null):new q(this.value,o)}else return this}}get(e){if(H(e))return this.value;{const n=M(e),i=this.children.get(n);return i?i.get(V(e)):null}}setTree(e,n){if(H(e))return n;{const i=M(e),o=(this.children.get(i)||new q(null)).setTree(V(e),n);let s;return o.isEmpty()?s=this.children.remove(i):s=this.children.insert(i,o),new q(this.value,s)}}fold(e){return this.fold_(F(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((r,o)=>{i[r]=o.fold_(W(e,r),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,F(),n)}findOnPath_(e,n,i){const r=this.value?i(n,this.value):!1;if(r)return r;if(H(e))return null;{const o=M(e),s=this.children.get(o);return s?s.findOnPath_(V(e),W(n,o),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,F(),n)}foreachOnPath_(e,n,i){if(H(e))return this;{this.value&&i(n,this.value);const r=M(e),o=this.children.get(r);return o?o.foreachOnPath_(V(e),W(n,r),i):new q(null)}}foreach(e){this.foreach_(F(),e)}foreach_(e,n){this.children.inorderTraversal((i,r)=>{r.foreach_(W(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}class _e{constructor(e){this.writeTree_=e}static empty(){return new _e(new q(null))}}function Mt(t,e,n){if(H(e))return new _e(new q(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const r=i.path;let o=i.value;const s=me(r,e);return o=o.updateChild(s,n),new _e(t.writeTree_.set(r,o))}else{const r=new q(n),o=t.writeTree_.setTree(e,r);return new _e(o)}}}function xi(t,e,n){let i=t;return ae(n,(r,o)=>{i=Mt(i,W(e,r),o)}),i}function Xr(t,e){if(H(e))return _e.empty();{const n=t.writeTree_.setTree(e,new q(null));return new _e(n)}}function _i(t,e){return st(t,e)!=null}function st(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(me(n.path,e)):null}function Zr(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(K,(i,r)=>{e.push(new R(i,r))}):t.writeTree_.children.inorderTraversal((i,r)=>{r.value!=null&&e.push(new R(i,r.value))}),e}function Ue(t,e){if(H(e))return t;{const n=st(t,e);return n!=null?new _e(new q(n)):new _e(t.writeTree_.subtree(e))}}function ki(t){return t.writeTree_.isEmpty()}function bt(t,e){return Fs(F(),t.writeTree_,e)}function Fs(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((r,o)=>{r===".priority"?(C(o.value!==null,"Priority writes must always be leaf nodes"),i=o.value):n=Fs(W(t,r),o,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(W(t,".priority"),i)),n}}function Mn(t,e){return Vs(e,t)}function ff(t,e,n,i,r){C(i>t.lastWriteId,"Stacking an older write on top of newer ones"),r===void 0&&(r=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:r}),r&&(t.visibleWrites=Mt(t.visibleWrites,e,n)),t.lastWriteId=i}function pf(t,e,n,i){C(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=xi(t.visibleWrites,e,n),t.lastWriteId=i}function mf(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function hf(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);C(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let r=i.visible,o=!1,s=t.allWrites.length-1;for(;r&&s>=0;){const a=t.allWrites[s];a.visible&&(s>=n&&uf(a,i.path)?r=!1:ye(i.path,a.path)&&(o=!0)),s--}if(r){if(o)return gf(t),!0;if(i.snap)t.visibleWrites=Xr(t.visibleWrites,i.path);else{const a=i.children;ae(a,l=>{t.visibleWrites=Xr(t.visibleWrites,W(i.path,l))})}return!0}else return!1}function uf(t,e){if(t.snap)return ye(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&ye(W(t.path,n),e))return!0;return!1}function gf(t){t.visibleWrites=Bs(t.allWrites,vf,F()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function vf(t){return t.visible}function Bs(t,e,n){let i=_e.empty();for(let r=0;r<t.length;++r){const o=t[r];if(e(o)){const s=o.path;let a;if(o.snap)ye(n,s)?(a=me(n,s),i=Mt(i,a,o.snap)):ye(s,n)&&(a=me(s,n),i=Mt(i,F(),o.snap.getChild(a)));else if(o.children){if(ye(n,s))a=me(n,s),i=xi(i,a,o.children);else if(ye(s,n))if(a=me(s,n),H(a))i=xi(i,F(),o.children);else{const l=et(o.children,M(a));if(l){const d=l.getChild(V(a));i=Mt(i,F(),d)}}}else throw _t("WriteRecord should have .snap or .children")}}return i}function js(t,e,n,i,r){if(!i&&!r){const o=st(t.visibleWrites,e);if(o!=null)return o;{const s=Ue(t.visibleWrites,e);if(ki(s))return n;if(n==null&&!_i(s,F()))return null;{const a=n||L.EMPTY_NODE;return bt(s,a)}}}else{const o=Ue(t.visibleWrites,e);if(!r&&ki(o))return n;if(!r&&n==null&&!_i(o,F()))return null;{const s=function(d){return(d.visible||r)&&(!i||!~i.indexOf(d.writeId))&&(ye(d.path,e)||ye(e,d.path))},a=Bs(t.allWrites,s,e),l=n||L.EMPTY_NODE;return bt(a,l)}}}function yf(t,e,n){let i=L.EMPTY_NODE;const r=st(t.visibleWrites,e);if(r)return r.isLeafNode()||r.forEachChild(K,(o,s)=>{i=i.updateImmediateChild(o,s)}),i;if(n){const o=Ue(t.visibleWrites,e);return n.forEachChild(K,(s,a)=>{const l=bt(Ue(o,new U(s)),a);i=i.updateImmediateChild(s,l)}),Zr(o).forEach(s=>{i=i.updateImmediateChild(s.name,s.node)}),i}else{const o=Ue(t.visibleWrites,e);return Zr(o).forEach(s=>{i=i.updateImmediateChild(s.name,s.node)}),i}}function bf(t,e,n,i,r){C(i||r,"Either existingEventSnap or existingServerSnap must exist");const o=W(e,n);if(_i(t.visibleWrites,o))return null;{const s=Ue(t.visibleWrites,o);return ki(s)?r.getChild(n):bt(s,r.getChild(n))}}function wf(t,e,n,i){const r=W(e,n),o=st(t.visibleWrites,r);if(o!=null)return o;if(i.isCompleteForChild(n)){const s=Ue(t.visibleWrites,r);return bt(s,i.getNode().getImmediateChild(n))}else return null}function xf(t,e){return st(t.visibleWrites,e)}function _f(t,e,n,i,r,o,s){let a;const l=Ue(t.visibleWrites,e),d=st(l,F());if(d!=null)a=d;else if(n!=null)a=bt(l,n);else return[];if(a=a.withIndex(s),!a.isEmpty()&&!a.isLeafNode()){const p=[],c=s.getCompare(),f=o?a.getReverseIteratorFrom(i,s):a.getIteratorFrom(i,s);let u=f.getNext();for(;u&&p.length<r;)c(u,i)!==0&&p.push(u),u=f.getNext();return p}else return[]}function kf(){return{visibleWrites:_e.empty(),allWrites:[],lastWriteId:-1}}function kn(t,e,n,i){return js(t.writeTree,t.treePath,e,n,i)}function Gi(t,e){return yf(t.writeTree,t.treePath,e)}function eo(t,e,n,i){return bf(t.writeTree,t.treePath,e,n,i)}function Tn(t,e){return xf(t.writeTree,W(t.treePath,e))}function Tf(t,e,n,i,r,o){return _f(t.writeTree,t.treePath,e,n,i,r,o)}function Ki(t,e,n){return wf(t.writeTree,t.treePath,e,n)}function Us(t,e){return Vs(W(t.treePath,e),t.writeTree)}function Vs(t,e){return{treePath:t,writeTree:e}}class Cf{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;C(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),C(i!==".priority","Only non-priority child changes can be tracked.");const r=this.changeMap.get(i);if(r){const o=r.type;if(n==="child_added"&&o==="child_removed")this.changeMap.set(i,Vt(i,e.snapshotNode,r.snapshotNode));else if(n==="child_removed"&&o==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&o==="child_changed")this.changeMap.set(i,Ut(i,r.oldSnap));else if(n==="child_changed"&&o==="child_added")this.changeMap.set(i,vt(i,e.snapshotNode));else if(n==="child_changed"&&o==="child_changed")this.changeMap.set(i,Vt(i,e.snapshotNode,r.oldSnap));else throw _t("Illegal combination of changes: "+e+" occurred after "+r)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}class Sf{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const qs=new Sf;class Yi{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Ge(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Ki(this.writes_,e,i)}}getChildAfterChild(e,n,i){const r=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:it(this.viewCache_),o=Tf(this.writes_,r,n,1,i,e);return o.length===0?null:o[0]}}function $f(t){return{filter:t}}function Ef(t,e){C(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),C(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Nf(t,e,n,i,r){const o=new Cf;let s,a;if(n.type===xe.OVERWRITE){const d=n;d.source.fromUser?s=Ti(t,e,d.path,d.snap,i,r,o):(C(d.source.fromServer,"Unknown source."),a=d.source.tagged||e.serverCache.isFiltered()&&!H(d.path),s=Cn(t,e,d.path,d.snap,i,r,a,o))}else if(n.type===xe.MERGE){const d=n;d.source.fromUser?s=Df(t,e,d.path,d.children,i,r,o):(C(d.source.fromServer,"Unknown source."),a=d.source.tagged||e.serverCache.isFiltered(),s=Ci(t,e,d.path,d.children,i,r,a,o))}else if(n.type===xe.ACK_USER_WRITE){const d=n;d.revert?s=Af(t,e,d.path,i,r,o):s=Lf(t,e,d.path,d.affectedTree,i,r,o)}else if(n.type===xe.LISTEN_COMPLETE)s=zf(t,e,n.path,i,o);else throw _t("Unknown operation type: "+n.type);const l=o.getChanges();return If(e,s,l),{viewCache:s,changes:l}}function If(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const r=i.getNode().isLeafNode()||i.getNode().isEmpty(),o=_n(t);(n.length>0||!t.eventCache.isFullyInitialized()||r&&!i.getNode().equals(o)||!i.getNode().getPriority().equals(o.getPriority()))&&n.push(Rs(_n(e)))}}function Gs(t,e,n,i,r,o){const s=e.eventCache;if(Tn(i,n)!=null)return e;{let a,l;if(H(n))if(C(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const d=it(e),p=d instanceof L?d:L.EMPTY_NODE,c=Gi(i,p);a=t.filter.updateFullNode(e.eventCache.getNode(),c,o)}else{const d=kn(i,it(e));a=t.filter.updateFullNode(e.eventCache.getNode(),d,o)}else{const d=M(n);if(d===".priority"){C(qe(n)===1,"Can't have a priority with additional path components");const p=s.getNode();l=e.serverCache.getNode();const c=eo(i,n,p,l);c!=null?a=t.filter.updatePriority(p,c):a=s.getNode()}else{const p=V(n);let c;if(s.isCompleteForChild(d)){l=e.serverCache.getNode();const f=eo(i,n,s.getNode(),l);f!=null?c=s.getNode().getImmediateChild(d).updateChild(p,f):c=s.getNode().getImmediateChild(d)}else c=Ki(i,d,e.serverCache);c!=null?a=t.filter.updateChild(s.getNode(),d,c,p,r,o):a=s.getNode()}}return Pt(e,a,s.isFullyInitialized()||H(n),t.filter.filtersNodes())}}function Cn(t,e,n,i,r,o,s,a){const l=e.serverCache;let d;const p=s?t.filter:t.filter.getIndexedFilter();if(H(n))d=p.updateFullNode(l.getNode(),i,null);else if(p.filtersNodes()&&!l.isFiltered()){const u=l.getNode().updateChild(n,i);d=p.updateFullNode(l.getNode(),u,null)}else{const u=M(n);if(!l.isCompleteForPath(n)&&qe(n)>1)return e;const h=V(n),g=l.getNode().getImmediateChild(u).updateChild(h,i);u===".priority"?d=p.updatePriority(l.getNode(),g):d=p.updateChild(l.getNode(),u,g,h,qs,null)}const c=Os(e,d,l.isFullyInitialized()||H(n),p.filtersNodes()),f=new Yi(r,c,o);return Gs(t,c,n,r,f,a)}function Ti(t,e,n,i,r,o,s){const a=e.eventCache;let l,d;const p=new Yi(r,e,o);if(H(n))d=t.filter.updateFullNode(e.eventCache.getNode(),i,s),l=Pt(e,d,!0,t.filter.filtersNodes());else{const c=M(n);if(c===".priority")d=t.filter.updatePriority(e.eventCache.getNode(),i),l=Pt(e,d,a.isFullyInitialized(),a.isFiltered());else{const f=V(n),u=a.getNode().getImmediateChild(c);let h;if(H(f))h=i;else{const v=p.getCompleteChild(c);v!=null?Ri(f)===".priority"&&v.getChild(Ds(f)).isEmpty()?h=v:h=v.updateChild(f,i):h=L.EMPTY_NODE}if(u.equals(h))l=e;else{const v=t.filter.updateChild(a.getNode(),c,h,f,p,s);l=Pt(e,v,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function to(t,e){return t.eventCache.isCompleteForChild(e)}function Df(t,e,n,i,r,o,s){let a=e;return i.foreach((l,d)=>{const p=W(n,l);to(e,M(p))&&(a=Ti(t,a,p,d,r,o,s))}),i.foreach((l,d)=>{const p=W(n,l);to(e,M(p))||(a=Ti(t,a,p,d,r,o,s))}),a}function no(t,e,n){return n.foreach((i,r)=>{e=e.updateChild(i,r)}),e}function Ci(t,e,n,i,r,o,s,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,d;H(n)?d=i:d=new q(null).setTree(n,i);const p=e.serverCache.getNode();return d.children.inorderTraversal((c,f)=>{if(p.hasChild(c)){const u=e.serverCache.getNode().getImmediateChild(c),h=no(t,u,f);l=Cn(t,l,new U(c),h,r,o,s,a)}}),d.children.inorderTraversal((c,f)=>{const u=!e.serverCache.isCompleteForChild(c)&&f.value===null;if(!p.hasChild(c)&&!u){const h=e.serverCache.getNode().getImmediateChild(c),v=no(t,h,f);l=Cn(t,l,new U(c),v,r,o,s,a)}}),l}function Lf(t,e,n,i,r,o,s){if(Tn(r,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(H(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return Cn(t,e,n,l.getNode().getChild(n),r,o,a,s);if(H(n)){let d=new q(null);return l.getNode().forEachChild(ht,(p,c)=>{d=d.set(new U(p),c)}),Ci(t,e,n,d,r,o,a,s)}else return e}else{let d=new q(null);return i.foreach((p,c)=>{const f=W(n,p);l.isCompleteForPath(f)&&(d=d.set(p,l.getNode().getChild(f)))}),Ci(t,e,n,d,r,o,a,s)}}function zf(t,e,n,i,r){const o=e.serverCache,s=Os(e,o.getNode(),o.isFullyInitialized()||H(n),o.isFiltered());return Gs(t,s,n,i,qs,r)}function Af(t,e,n,i,r,o){let s;if(Tn(i,n)!=null)return e;{const a=new Yi(i,e,r),l=e.eventCache.getNode();let d;if(H(n)||M(n)===".priority"){let p;if(e.serverCache.isFullyInitialized())p=kn(i,it(e));else{const c=e.serverCache.getNode();C(c instanceof L,"serverChildren would be complete if leaf node"),p=Gi(i,c)}p=p,d=t.filter.updateFullNode(l,p,o)}else{const p=M(n);let c=Ki(i,p,e.serverCache);c==null&&e.serverCache.isCompleteForChild(p)&&(c=l.getImmediateChild(p)),c!=null?d=t.filter.updateChild(l,p,c,V(n),a,o):e.eventCache.getNode().hasChild(p)?d=t.filter.updateChild(l,p,L.EMPTY_NODE,V(n),a,o):d=l,d.isEmpty()&&e.serverCache.isFullyInitialized()&&(s=kn(i,it(e)),s.isLeafNode()&&(d=t.filter.updateFullNode(d,s,o)))}return s=e.serverCache.isFullyInitialized()||Tn(i,F())!=null,Pt(e,d,s,t.filter.filtersNodes())}}class Pf{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,r=new ji(i.getIndex()),o=Xc(i);this.processor_=$f(o);const s=n.serverCache,a=n.eventCache,l=r.updateFullNode(L.EMPTY_NODE,s.getNode(),null),d=o.updateFullNode(L.EMPTY_NODE,a.getNode(),null),p=new Ge(l,s.isFullyInitialized(),r.filtersNodes()),c=new Ge(d,a.isFullyInitialized(),o.filtersNodes());this.viewCache_=Pn(c,p),this.eventGenerator_=new sf(this.query_)}get query(){return this.query_}}function Mf(t){return t.viewCache_.serverCache.getNode()}function Hf(t){return _n(t.viewCache_)}function Rf(t,e){const n=it(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!H(e)&&!n.getImmediateChild(M(e)).isEmpty())?n.getChild(e):null}function io(t){return t.eventRegistrations_.length===0}function Of(t,e){t.eventRegistrations_.push(e)}function ro(t,e,n){const i=[];if(n){C(e==null,"A cancel should cancel all event registrations.");const r=t.query._path;t.eventRegistrations_.forEach(o=>{const s=o.createCancelEvent(n,r);s&&i.push(s)})}if(e){let r=[];for(let o=0;o<t.eventRegistrations_.length;++o){const s=t.eventRegistrations_[o];if(!s.matches(e))r.push(s);else if(e.hasAnyCallback()){r=r.concat(t.eventRegistrations_.slice(o+1));break}}t.eventRegistrations_=r}else t.eventRegistrations_=[];return i}function oo(t,e,n,i){e.type===xe.MERGE&&e.source.queryId!==null&&(C(it(t.viewCache_),"We should always have a full cache before handling merges"),C(_n(t.viewCache_),"Missing event cache, even though we have a server cache"));const r=t.viewCache_,o=Nf(t.processor_,r,e,n,i);return Ef(t.processor_,o.viewCache),C(o.viewCache.serverCache.isFullyInitialized()||!r.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=o.viewCache,Ks(t,o.changes,o.viewCache.eventCache.getNode(),null)}function Ff(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(K,(o,s)=>{i.push(vt(o,s))}),n.isFullyInitialized()&&i.push(Rs(n.getNode())),Ks(t,i,n.getNode(),e)}function Ks(t,e,n,i){const r=i?[i]:t.eventRegistrations_;return af(t.eventGenerator_,e,n,r)}let Sn;class Ys{constructor(){this.views=new Map}}function Bf(t){C(!Sn,"__referenceConstructor has already been defined"),Sn=t}function jf(){return C(Sn,"Reference.ts has not been loaded"),Sn}function Uf(t){return t.views.size===0}function Wi(t,e,n,i){const r=e.source.queryId;if(r!==null){const o=t.views.get(r);return C(o!=null,"SyncTree gave us an op for an invalid query."),oo(o,e,n,i)}else{let o=[];for(const s of t.views.values())o=o.concat(oo(s,e,n,i));return o}}function Ws(t,e,n,i,r){const o=e._queryIdentifier,s=t.views.get(o);if(!s){let a=kn(n,r?i:null),l=!1;a?l=!0:i instanceof L?(a=Gi(n,i),l=!1):(a=L.EMPTY_NODE,l=!1);const d=Pn(new Ge(a,l,!1),new Ge(i,r,!1));return new Pf(e,d)}return s}function Vf(t,e,n,i,r,o){const s=Ws(t,e,i,r,o);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,s),Of(s,n),Ff(s,n)}function qf(t,e,n,i){const r=e._queryIdentifier,o=[];let s=[];const a=Ke(t);if(r==="default")for(const[l,d]of t.views.entries())s=s.concat(ro(d,n,i)),io(d)&&(t.views.delete(l),d.query._queryParams.loadsAllData()||o.push(d.query));else{const l=t.views.get(r);l&&(s=s.concat(ro(l,n,i)),io(l)&&(t.views.delete(r),l.query._queryParams.loadsAllData()||o.push(l.query)))}return a&&!Ke(t)&&o.push(new(jf())(e._repo,e._path)),{removed:o,events:s}}function Js(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Ve(t,e){let n=null;for(const i of t.views.values())n=n||Rf(i,e);return n}function Qs(t,e){if(e._queryParams.loadsAllData())return Hn(t);{const i=e._queryIdentifier;return t.views.get(i)}}function Xs(t,e){return Qs(t,e)!=null}function Ke(t){return Hn(t)!=null}function Hn(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}let $n;function Gf(t){C(!$n,"__referenceConstructor has already been defined"),$n=t}function Kf(){return C($n,"Reference.ts has not been loaded"),$n}let Yf=1;class so{constructor(e){this.listenProvider_=e,this.syncPointTree_=new q(null),this.pendingWriteTree_=kf(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Ji(t,e,n,i,r){return ff(t.pendingWriteTree_,e,n,i,r),r?Ct(t,new nt(Ui(),e,n)):[]}function Wf(t,e,n,i){pf(t.pendingWriteTree_,e,n,i);const r=q.fromObject(n);return Ct(t,new yt(Ui(),e,r))}function Oe(t,e,n=!1){const i=mf(t.pendingWriteTree_,e);if(hf(t.pendingWriteTree_,e)){let o=new q(null);return i.snap!=null?o=o.set(F(),!0):ae(i.children,s=>{o=o.set(new U(s),!0)}),Ct(t,new xn(i.path,o,n))}else return[]}function Zt(t,e,n){return Ct(t,new nt(Vi(),e,n))}function Jf(t,e,n){const i=q.fromObject(n);return Ct(t,new yt(Vi(),e,i))}function Qf(t,e){return Ct(t,new Gt(Vi(),e))}function Xf(t,e,n){const i=Qi(t,n);if(i){const r=Xi(i),o=r.path,s=r.queryId,a=me(o,e),l=new Gt(qi(s),a);return Zi(t,o,l)}else return[]}function En(t,e,n,i,r=!1){const o=e._path,s=t.syncPointTree_.get(o);let a=[];if(s&&(e._queryIdentifier==="default"||Xs(s,e))){const l=qf(s,e,n,i);Uf(s)&&(t.syncPointTree_=t.syncPointTree_.remove(o));const d=l.removed;if(a=l.events,!r){const p=d.findIndex(f=>f._queryParams.loadsAllData())!==-1,c=t.syncPointTree_.findOnPath(o,(f,u)=>Ke(u));if(p&&!c){const f=t.syncPointTree_.subtree(o);if(!f.isEmpty()){const u=tp(f);for(let h=0;h<u.length;++h){const v=u[h],g=v.query,_=na(t,v);t.listenProvider_.startListening(Ht(g),Kt(t,g),_.hashFn,_.onComplete)}}}!c&&d.length>0&&!i&&(p?t.listenProvider_.stopListening(Ht(e),null):d.forEach(f=>{const u=t.queryToTagMap.get(On(f));t.listenProvider_.stopListening(Ht(f),u)}))}np(t,d)}return a}function Zs(t,e,n,i){const r=Qi(t,i);if(r!=null){const o=Xi(r),s=o.path,a=o.queryId,l=me(s,e),d=new nt(qi(a),l,n);return Zi(t,s,d)}else return[]}function Zf(t,e,n,i){const r=Qi(t,i);if(r){const o=Xi(r),s=o.path,a=o.queryId,l=me(s,e),d=q.fromObject(n),p=new yt(qi(a),l,d);return Zi(t,s,p)}else return[]}function Si(t,e,n,i=!1){const r=e._path;let o=null,s=!1;t.syncPointTree_.foreachOnPath(r,(f,u)=>{const h=me(f,r);o=o||Ve(u,h),s=s||Ke(u)});let a=t.syncPointTree_.get(r);a?(s=s||Ke(a),o=o||Ve(a,F())):(a=new Ys,t.syncPointTree_=t.syncPointTree_.set(r,a));let l;o!=null?l=!0:(l=!1,o=L.EMPTY_NODE,t.syncPointTree_.subtree(r).foreachChild((u,h)=>{const v=Ve(h,F());v&&(o=o.updateImmediateChild(u,v))}));const d=Xs(a,e);if(!d&&!e._queryParams.loadsAllData()){const f=On(e);C(!t.queryToTagMap.has(f),"View does not exist, but we have a tag");const u=ip();t.queryToTagMap.set(f,u),t.tagToQueryMap.set(u,f)}const p=Mn(t.pendingWriteTree_,r);let c=Vf(a,e,n,p,o,l);if(!d&&!s&&!i){const f=Qs(a,e);c=c.concat(rp(t,e,f))}return c}function Rn(t,e,n){const r=t.pendingWriteTree_,o=t.syncPointTree_.findOnPath(e,(s,a)=>{const l=me(s,e),d=Ve(a,l);if(d)return d});return js(r,e,o,n,!0)}function ep(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(d,p)=>{const c=me(d,n);i=i||Ve(p,c)});let r=t.syncPointTree_.get(n);r?i=i||Ve(r,F()):(r=new Ys,t.syncPointTree_=t.syncPointTree_.set(n,r));const o=i!=null,s=o?new Ge(i,!0,!1):null,a=Mn(t.pendingWriteTree_,e._path),l=Ws(r,e,a,o?s.getNode():L.EMPTY_NODE,o);return Hf(l)}function Ct(t,e){return ea(e,t.syncPointTree_,null,Mn(t.pendingWriteTree_,F()))}function ea(t,e,n,i){if(H(t.path))return ta(t,e,n,i);{const r=e.get(F());n==null&&r!=null&&(n=Ve(r,F()));let o=[];const s=M(t.path),a=t.operationForChild(s),l=e.children.get(s);if(l&&a){const d=n?n.getImmediateChild(s):null,p=Us(i,s);o=o.concat(ea(a,l,d,p))}return r&&(o=o.concat(Wi(r,t,i,n))),o}}function ta(t,e,n,i){const r=e.get(F());n==null&&r!=null&&(n=Ve(r,F()));let o=[];return e.children.inorderTraversal((s,a)=>{const l=n?n.getImmediateChild(s):null,d=Us(i,s),p=t.operationForChild(s);p&&(o=o.concat(ta(p,a,l,d)))}),r&&(o=o.concat(Wi(r,t,i,n))),o}function na(t,e){const n=e.query,i=Kt(t,n);return{hashFn:()=>(Mf(e)||L.EMPTY_NODE).hash(),onComplete:r=>{if(r==="ok")return i?Xf(t,n._path,i):Qf(t,n._path);{const o=Jd(r,n);return En(t,n,null,o)}}}}function Kt(t,e){const n=On(e);return t.queryToTagMap.get(n)}function On(t){return t._path.toString()+"$"+t._queryIdentifier}function Qi(t,e){return t.tagToQueryMap.get(e)}function Xi(t){const e=t.indexOf("$");return C(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new U(t.substr(0,e))}}function Zi(t,e,n){const i=t.syncPointTree_.get(e);C(i,"Missing sync point for query tag that we're tracking");const r=Mn(t.pendingWriteTree_,e);return Wi(i,n,r,null)}function tp(t){return t.fold((e,n,i)=>{if(n&&Ke(n))return[Hn(n)];{let r=[];return n&&(r=Js(n)),ae(i,(o,s)=>{r=r.concat(s)}),r}})}function Ht(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(Kf())(t._repo,t._path):t}function np(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const r=On(i),o=t.queryToTagMap.get(r);t.queryToTagMap.delete(r),t.tagToQueryMap.delete(o)}}}function ip(){return Yf++}function rp(t,e,n){const i=e._path,r=Kt(t,e),o=na(t,n),s=t.listenProvider_.startListening(Ht(e),r,o.hashFn,o.onComplete),a=t.syncPointTree_.subtree(i);if(r)C(!Ke(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((d,p,c)=>{if(!H(d)&&p&&Ke(p))return[Hn(p).query];{let f=[];return p&&(f=f.concat(Js(p).map(u=>u.query))),ae(c,(u,h)=>{f=f.concat(h)}),f}});for(let d=0;d<l.length;++d){const p=l[d];t.listenProvider_.stopListening(Ht(p),Kt(t,p))}}return s}class er{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new er(n)}node(){return this.node_}}class tr{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=W(this.path_,e);return new tr(this.syncTree_,n)}node(){return Rn(this.syncTree_,this.path_)}}const op=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},ao=function(t,e,n){if(!t||typeof t!="object")return t;if(C(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return sp(t[".sv"],e,n);if(typeof t[".sv"]=="object")return ap(t[".sv"],e);C(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},sp=function(t,e,n){if(t==="timestamp")return n.timestamp;C(!1,"Unexpected server value: "+t)},ap=function(t,e,n){t.hasOwnProperty("increment")||C(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&C(!1,"Unexpected increment value: "+i);const r=e.node();if(C(r!==null&&typeof r<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!r.isLeafNode())return i;const s=r.getValue();return typeof s!="number"?i:s+i},ia=function(t,e,n,i){return ir(e,new tr(n,t),i)},nr=function(t,e,n){return ir(t,new er(e),n)};function ir(t,e,n){const i=t.getPriority().val(),r=ao(i,e.getImmediateChild(".priority"),n);let o;if(t.isLeafNode()){const s=t,a=ao(s.getValue(),e,n);return a!==s.getValue()||r!==s.getPriority().val()?new re(a,Y(r)):t}else{const s=t;return o=s,r!==s.getPriority().val()&&(o=o.updatePriority(new re(r))),s.forEachChild(K,(a,l)=>{const d=ir(l,e.getImmediateChild(a),n);d!==l&&(o=o.updateImmediateChild(a,d))}),o}}class rr{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function Fn(t,e){let n=e instanceof U?e:new U(e),i=t,r=M(n);for(;r!==null;){const o=et(i.node.children,r)||{children:{},childCount:0};i=new rr(r,i,o),n=V(n),r=M(n)}return i}function at(t){return t.node.value}function or(t,e){t.node.value=e,$i(t)}function ra(t){return t.node.childCount>0}function lp(t){return at(t)===void 0&&!ra(t)}function Bn(t,e){ae(t.node.children,(n,i)=>{e(new rr(n,t,i))})}function oa(t,e,n,i){n&&e(t),Bn(t,r=>{oa(r,e,!0)})}function dp(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function en(t){return new U(t.parent===null?t.name:en(t.parent)+"/"+t.name)}function $i(t){t.parent!==null&&cp(t.parent,t.name,t)}function cp(t,e,n){const i=lp(n),r=ke(t.node.children,e);i&&r?(delete t.node.children[e],t.node.childCount--,$i(t)):!i&&!r&&(t.node.children[e]=n.node,t.node.childCount++,$i(t))}const fp=/[\[\].#$\/\u0000-\u001F\u007F]/,pp=/[\[\].#$\u0000-\u001F\u007F]/,ri=10*1024*1024,sr=function(t){return typeof t=="string"&&t.length!==0&&!fp.test(t)},sa=function(t){return typeof t=="string"&&t.length!==0&&!pp.test(t)},mp=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),sa(t)},ar=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Ln(t)||t&&typeof t=="object"&&ke(t,".sv")},Nn=function(t,e,n,i){i&&e===void 0||tn(ut(t,"value"),e,n)},tn=function(t,e,n){const i=n instanceof U?new Ic(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Xe(i));if(typeof e=="function")throw new Error(t+"contains a function "+Xe(i)+" with contents = "+e.toString());if(Ln(e))throw new Error(t+"contains "+e.toString()+" "+Xe(i));if(typeof e=="string"&&e.length>ri/3&&Dn(e)>ri)throw new Error(t+"contains a string greater than "+ri+" utf8 bytes "+Xe(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let r=!1,o=!1;if(ae(e,(s,a)=>{if(s===".value")r=!0;else if(s!==".priority"&&s!==".sv"&&(o=!0,!sr(s)))throw new Error(t+" contains an invalid key ("+s+") "+Xe(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Dc(i,s),tn(t,a,i),Lc(i)}),r&&o)throw new Error(t+' contains ".value" child '+Xe(i)+" in addition to actual children.")}},hp=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const o=jt(i);for(let s=0;s<o.length;s++)if(!(o[s]===".priority"&&s===o.length-1)){if(!sr(o[s]))throw new Error(t+"contains an invalid key ("+o[s]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Nc);let r=null;for(n=0;n<e.length;n++){if(i=e[n],r!==null&&ye(r,i))throw new Error(t+"contains a path "+r.toString()+" that is ancestor of another path "+i.toString());r=i}},aa=function(t,e,n,i){const r=ut(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(r+" must be an object containing the children to replace.");const o=[];ae(e,(s,a)=>{const l=new U(s);if(tn(r,a,W(n,l)),Ri(l)===".priority"&&!ar(a))throw new Error(r+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");o.push(l)}),hp(r,o)},up=function(t,e,n){if(Ln(e))throw new Error(ut(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!ar(e))throw new Error(ut(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},lr=function(t,e,n,i){if(!sa(n))throw new Error(ut(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},gp=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),lr(t,e,n)},Fe=function(t,e){if(M(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},vp=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!sr(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!mp(n))throw new Error(ut(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};class yp{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function jn(t,e){let n=null;for(let i=0;i<e.length;i++){const r=e[i],o=r.getPath();n!==null&&!Oi(o,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:o}),n.events.push(r)}n&&t.eventLists_.push(n)}function la(t,e,n){jn(t,n),da(t,i=>Oi(i,e))}function ve(t,e,n){jn(t,n),da(t,i=>ye(i,e)||ye(e,i))}function da(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const r=t.eventLists_[i];if(r){const o=r.path;e(o)?(bp(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function bp(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();zt&&se("event: "+n.toString()),kt(i)}}}const wp="repo_interrupt",xp=25;class _p{constructor(e,n,i,r){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new yp,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=wn(),this.transactionQueueTree_=new rr,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function kp(t,e,n){if(t.stats_=Mi(t.repoInfo_),t.forceRestClient_||ec())t.server_=new bn(t.repoInfo_,(i,r,o,s)=>{lo(t,i,r,o,s)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>co(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ne(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new Le(t.repoInfo_,e,(i,r,o,s)=>{lo(t,i,r,o,s)},i=>{co(t,i)},i=>{Tp(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=oc(t.repoInfo_,()=>new of(t.stats_,t.server_)),t.infoData_=new Zc,t.infoSyncTree_=new so({startListening:(i,r,o,s)=>{let a=[];const l=t.infoData_.getNode(i._path);return l.isEmpty()||(a=Zt(t.infoSyncTree_,i._path,l),setTimeout(()=>{s("ok")},0)),a},stopListening:()=>{}}),dr(t,"connected",!1),t.serverSyncTree_=new so({startListening:(i,r,o,s)=>(t.server_.listen(i,o,r,(a,l)=>{const d=s(a,l);ve(t.eventQueue_,i._path,d)}),[]),stopListening:(i,r)=>{t.server_.unlisten(i,r)}})}function ca(t){const n=t.infoData_.getNode(new U(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function nn(t){return op({timestamp:ca(t)})}function lo(t,e,n,i,r){t.dataUpdateCount++;const o=new U(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let s=[];if(r)if(i){const l=pn(n,d=>Y(d));s=Zf(t.serverSyncTree_,o,l,r)}else{const l=Y(n);s=Zs(t.serverSyncTree_,o,l,r)}else if(i){const l=pn(n,d=>Y(d));s=Jf(t.serverSyncTree_,o,l)}else{const l=Y(n);s=Zt(t.serverSyncTree_,o,l)}let a=o;s.length>0&&(a=wt(t,o)),ve(t.eventQueue_,a,s)}function co(t,e){dr(t,"connected",e),e===!1&&Ep(t)}function Tp(t,e){ae(e,(n,i)=>{dr(t,n,i)})}function dr(t,e,n){const i=new U("/.info/"+e),r=Y(n);t.infoData_.updateSnapshot(i,r);const o=Zt(t.infoSyncTree_,i,r);ve(t.eventQueue_,i,o)}function Un(t){return t.nextWriteId_++}function Cp(t,e,n){const i=ep(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(r=>{const o=Y(r).withIndex(e._queryParams.getIndex());Si(t.serverSyncTree_,e,n,!0);let s;if(e._queryParams.loadsAllData())s=Zt(t.serverSyncTree_,e._path,o);else{const a=Kt(t.serverSyncTree_,e);s=Zs(t.serverSyncTree_,e._path,o,a)}return ve(t.eventQueue_,e._path,s),En(t.serverSyncTree_,e,n,null,!0),o},r=>(St(t,"get for query "+ne(e)+" failed: "+r),Promise.reject(new Error(r))))}function Sp(t,e,n,i,r){St(t,"set",{path:e.toString(),value:n,priority:i});const o=nn(t),s=Y(n,i),a=Rn(t.serverSyncTree_,e),l=nr(s,a,o),d=Un(t),p=Ji(t.serverSyncTree_,e,l,d,!0);jn(t.eventQueue_,p),t.server_.put(e.toString(),s.val(!0),(f,u)=>{const h=f==="ok";h||he("set at "+e+" failed: "+f);const v=Oe(t.serverSyncTree_,d,!h);ve(t.eventQueue_,e,v),Ye(t,r,f,u)});const c=fr(t,e);wt(t,c),ve(t.eventQueue_,c,[])}function $p(t,e,n,i){St(t,"update",{path:e.toString(),value:n});let r=!0;const o=nn(t),s={};if(ae(n,(a,l)=>{r=!1,s[a]=ia(W(e,a),Y(l),t.serverSyncTree_,o)}),r)se("update() called with empty data.  Don't do anything."),Ye(t,i,"ok",void 0);else{const a=Un(t),l=Wf(t.serverSyncTree_,e,s,a);jn(t.eventQueue_,l),t.server_.merge(e.toString(),n,(d,p)=>{const c=d==="ok";c||he("update at "+e+" failed: "+d);const f=Oe(t.serverSyncTree_,a,!c),u=f.length>0?wt(t,e):e;ve(t.eventQueue_,u,f),Ye(t,i,d,p)}),ae(n,d=>{const p=fr(t,W(e,d));wt(t,p)}),ve(t.eventQueue_,e,[])}}function Ep(t){St(t,"onDisconnectEvents");const e=nn(t),n=wn();wi(t.onDisconnect_,F(),(r,o)=>{const s=ia(r,o,t.serverSyncTree_,e);Tt(n,r,s)});let i=[];wi(n,F(),(r,o)=>{i=i.concat(Zt(t.serverSyncTree_,r,o));const s=fr(t,r);wt(t,s)}),t.onDisconnect_=wn(),ve(t.eventQueue_,F(),i)}function Np(t,e,n){t.server_.onDisconnectCancel(e.toString(),(i,r)=>{i==="ok"&&bi(t.onDisconnect_,e),Ye(t,n,i,r)})}function fo(t,e,n,i){const r=Y(n);t.server_.onDisconnectPut(e.toString(),r.val(!0),(o,s)=>{o==="ok"&&Tt(t.onDisconnect_,e,r),Ye(t,i,o,s)})}function Ip(t,e,n,i,r){const o=Y(n,i);t.server_.onDisconnectPut(e.toString(),o.val(!0),(s,a)=>{s==="ok"&&Tt(t.onDisconnect_,e,o),Ye(t,r,s,a)})}function Dp(t,e,n,i){if(ci(n)){se("onDisconnect().update() called with empty data.  Don't do anything."),Ye(t,i,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(r,o)=>{r==="ok"&&ae(n,(s,a)=>{const l=Y(a);Tt(t.onDisconnect_,W(e,s),l)}),Ye(t,i,r,o)})}function Lp(t,e,n){let i;M(e._path)===".info"?i=Si(t.infoSyncTree_,e,n):i=Si(t.serverSyncTree_,e,n),la(t.eventQueue_,e._path,i)}function po(t,e,n){let i;M(e._path)===".info"?i=En(t.infoSyncTree_,e,n):i=En(t.serverSyncTree_,e,n),la(t.eventQueue_,e._path,i)}function zp(t){t.persistentConnection_&&t.persistentConnection_.interrupt(wp)}function St(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),se(n,...e)}function Ye(t,e,n,i){e&&kt(()=>{if(n==="ok")e(null);else{const r=(n||"error").toUpperCase();let o=r;i&&(o+=": "+i);const s=new Error(o);s.code=r,e(s)}})}function Ap(t,e,n,i,r,o){St(t,"transaction on "+e);const s={path:e,update:n,onComplete:i,status:null,order:ds(),applyLocally:o,retryCount:0,unwatcher:r,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=cr(t,e,void 0);s.currentInputSnapshot=a;const l=s.update(a.val());if(l===void 0)s.unwatcher(),s.currentOutputSnapshotRaw=null,s.currentOutputSnapshotResolved=null,s.onComplete&&s.onComplete(null,!1,s.currentInputSnapshot);else{tn("transaction failed: Data returned ",l,s.path),s.status=0;const d=Fn(t.transactionQueueTree_,e),p=at(d)||[];p.push(s),or(d,p);let c;typeof l=="object"&&l!==null&&ke(l,".priority")?(c=et(l,".priority"),C(ar(c),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):c=(Rn(t.serverSyncTree_,e)||L.EMPTY_NODE).getPriority().val();const f=nn(t),u=Y(l,c),h=nr(u,a,f);s.currentOutputSnapshotRaw=u,s.currentOutputSnapshotResolved=h,s.currentWriteId=Un(t);const v=Ji(t.serverSyncTree_,e,h,s.currentWriteId,s.applyLocally);ve(t.eventQueue_,e,v),Vn(t,t.transactionQueueTree_)}}function cr(t,e,n){return Rn(t.serverSyncTree_,e,n)||L.EMPTY_NODE}function Vn(t,e=t.transactionQueueTree_){if(e||qn(t,e),at(e)){const n=pa(t,e);C(n.length>0,"Sending zero length transaction queue"),n.every(r=>r.status===0)&&Pp(t,en(e),n)}else ra(e)&&Bn(e,n=>{Vn(t,n)})}function Pp(t,e,n){const i=n.map(d=>d.currentWriteId),r=cr(t,e,i);let o=r;const s=r.hash();for(let d=0;d<n.length;d++){const p=n[d];C(p.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),p.status=1,p.retryCount++;const c=me(e,p.path);o=o.updateChild(c,p.currentOutputSnapshotRaw)}const a=o.val(!0),l=e;t.server_.put(l.toString(),a,d=>{St(t,"transaction put response",{path:l.toString(),status:d});let p=[];if(d==="ok"){const c=[];for(let f=0;f<n.length;f++)n[f].status=2,p=p.concat(Oe(t.serverSyncTree_,n[f].currentWriteId)),n[f].onComplete&&c.push(()=>n[f].onComplete(null,!0,n[f].currentOutputSnapshotResolved)),n[f].unwatcher();qn(t,Fn(t.transactionQueueTree_,e)),Vn(t,t.transactionQueueTree_),ve(t.eventQueue_,e,p);for(let f=0;f<c.length;f++)kt(c[f])}else{if(d==="datastale")for(let c=0;c<n.length;c++)n[c].status===3?n[c].status=4:n[c].status=0;else{he("transaction at "+l.toString()+" failed: "+d);for(let c=0;c<n.length;c++)n[c].status=4,n[c].abortReason=d}wt(t,e)}},s)}function wt(t,e){const n=fa(t,e),i=en(n),r=pa(t,n);return Mp(t,r,i),i}function Mp(t,e,n){if(e.length===0)return;const i=[];let r=[];const s=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],d=me(n,l.path);let p=!1,c;if(C(d!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)p=!0,c=l.abortReason,r=r.concat(Oe(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=xp)p=!0,c="maxretry",r=r.concat(Oe(t.serverSyncTree_,l.currentWriteId,!0));else{const f=cr(t,l.path,s);l.currentInputSnapshot=f;const u=e[a].update(f.val());if(u!==void 0){tn("transaction failed: Data returned ",u,l.path);let h=Y(u);typeof u=="object"&&u!=null&&ke(u,".priority")||(h=h.updatePriority(f.getPriority()));const g=l.currentWriteId,_=nn(t),b=nr(h,f,_);l.currentOutputSnapshotRaw=h,l.currentOutputSnapshotResolved=b,l.currentWriteId=Un(t),s.splice(s.indexOf(g),1),r=r.concat(Ji(t.serverSyncTree_,l.path,b,l.currentWriteId,l.applyLocally)),r=r.concat(Oe(t.serverSyncTree_,g,!0))}else p=!0,c="nodata",r=r.concat(Oe(t.serverSyncTree_,l.currentWriteId,!0))}ve(t.eventQueue_,n,r),r=[],p&&(e[a].status=2,(function(f){setTimeout(f,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(c==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(c),!1,null))))}qn(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)kt(i[a]);Vn(t,t.transactionQueueTree_)}function fa(t,e){let n,i=t.transactionQueueTree_;for(n=M(e);n!==null&&at(i)===void 0;)i=Fn(i,n),e=V(e),n=M(e);return i}function pa(t,e){const n=[];return ma(t,e,n),n.sort((i,r)=>i.order-r.order),n}function ma(t,e,n){const i=at(e);if(i)for(let r=0;r<i.length;r++)n.push(i[r]);Bn(e,r=>{ma(t,r,n)})}function qn(t,e){const n=at(e);if(n){let i=0;for(let r=0;r<n.length;r++)n[r].status!==2&&(n[i]=n[r],i++);n.length=i,or(e,n.length>0?n:void 0)}Bn(e,i=>{qn(t,i)})}function fr(t,e){const n=en(fa(t,e)),i=Fn(t.transactionQueueTree_,e);return dp(i,r=>{oi(t,r)}),oi(t,i),oa(i,r=>{oi(t,r)}),n}function oi(t,e){const n=at(e);if(n){const i=[];let r=[],o=-1;for(let s=0;s<n.length;s++)n[s].status===3||(n[s].status===1?(C(o===s-1,"All SENT items should be at beginning of queue."),o=s,n[s].status=3,n[s].abortReason="set"):(C(n[s].status===0,"Unexpected transaction status in abort"),n[s].unwatcher(),r=r.concat(Oe(t.serverSyncTree_,n[s].currentWriteId,!0)),n[s].onComplete&&i.push(n[s].onComplete.bind(null,new Error("set"),!1,null))));o===-1?or(e,void 0):n.length=o+1,ve(t.eventQueue_,en(e),r);for(let s=0;s<i.length;s++)kt(i[s])}}function Hp(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let r=n[i];try{r=decodeURIComponent(r.replace(/\+/g," "))}catch{}e+="/"+r}return e}function Rp(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):he(`Invalid query segment '${n}' in query '${t}'`)}return e}const mo=function(t,e){const n=Op(t),i=n.namespace;n.domain==="firebase.com"&&Ae(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&Ae("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||qd();const r=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new _s(n.host,n.secure,i,r,e,"",i!==n.subdomain),path:new U(n.pathString)}},Op=function(t){let e="",n="",i="",r="",o="",s=!0,a="https",l=443;if(typeof t=="string"){let d=t.indexOf("//");d>=0&&(a=t.substring(0,d-1),t=t.substring(d+2));let p=t.indexOf("/");p===-1&&(p=t.length);let c=t.indexOf("?");c===-1&&(c=t.length),e=t.substring(0,Math.min(p,c)),p<c&&(r=Hp(t.substring(p,c)));const f=Rp(t.substring(Math.min(t.length,c)));d=e.indexOf(":"),d>=0?(s=a==="https"||a==="wss",l=parseInt(e.substring(d+1),10)):d=e.length;const u=e.slice(0,d);if(u.toLowerCase()==="localhost")n="localhost";else if(u.split(".").length<=2)n=u;else{const h=e.indexOf(".");i=e.substring(0,h).toLowerCase(),n=e.substring(h+1),o=i}"ns"in f&&(o=f.ns)}return{host:e,port:l,domain:n,subdomain:i,secure:s,scheme:a,pathString:r,namespace:o}};const ho="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Fp=(function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let r;const o=new Array(8);for(r=7;r>=0;r--)o[r]=ho.charAt(n%64),n=Math.floor(n/64);C(n===0,"Cannot push at time == 0");let s=o.join("");if(i){for(r=11;r>=0&&e[r]===63;r--)e[r]=0;e[r]++}else for(r=0;r<12;r++)e[r]=Math.floor(Math.random()*64);for(r=0;r<12;r++)s+=ho.charAt(e[r]);return C(s.length===20,"nextPushId: Length should be 20."),s}})();class Bp{constructor(e,n,i,r){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=r}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ne(this.snapshot.exportVal())}}class jp{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}class ha{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return C(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}class ua{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new be;return Np(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){Fe("OnDisconnect.remove",this._path);const e=new be;return fo(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){Fe("OnDisconnect.set",this._path),Nn("OnDisconnect.set",e,this._path,!1);const n=new be;return fo(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){Fe("OnDisconnect.setWithPriority",this._path),Nn("OnDisconnect.setWithPriority",e,this._path,!1),up("OnDisconnect.setWithPriority",n);const i=new be;return Ip(this._repo,this._path,e,n,i.wrapCallback(()=>{})),i.promise}update(e){Fe("OnDisconnect.update",this._path),aa("OnDisconnect.update",e,this._path);const n=new be;return Dp(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}class Gn{constructor(e,n,i,r){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=r}get key(){return H(this._path)?null:Ri(this._path)}get ref(){return new Te(this._repo,this._path)}get _queryIdentifier(){const e=Jr(this._queryParams),n=Ai(e);return n==="{}"?"default":n}get _queryObject(){return Jr(this._queryParams)}isEqual(e){if(e=Pe(e),!(e instanceof Gn))return!1;const n=this._repo===e._repo,i=Oi(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return n&&i&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+Ec(this._path)}}class Te extends Gn{constructor(e,n){super(e,n,new An,!1)}get parent(){const e=Ds(this._path);return e===null?null:new Te(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class rt{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new U(e),i=xt(this.ref,e);return new rt(this._node.getChild(n),i,K)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,r)=>e(new rt(r,xt(this.ref,i),K)))}hasChild(e){const n=new U(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function ce(t,e){return t=Pe(t),t._checkNotDeleted("ref"),e!==void 0?xt(t._root,e):t._root}function xt(t,e){return t=Pe(t),M(t._path)===null?gp("child","path",e):lr("child","path",e),new Te(t._repo,W(t._path,e))}function Up(t){return t=Pe(t),new ua(t._repo,t._path)}function ga(t,e){t=Pe(t),Fe("push",t._path),Nn("push",e,t._path,!0);const n=ca(t._repo),i=Fp(n),r=xt(t,i),o=xt(t,i);let s;return e!=null?s=rn(o,e).then(()=>o):s=Promise.resolve(o),r.then=s.then.bind(s),r.catch=s.then.bind(s,void 0),r}function rn(t,e){t=Pe(t),Fe("set",t._path),Nn("set",e,t._path,!1);const n=new be;return Sp(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function pr(t,e){aa("update",e,t._path);const n=new be;return $p(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function va(t){t=Pe(t);const e=new ha(()=>{}),n=new Kn(e);return Cp(t._repo,t,n).then(i=>new rt(i,new Te(t._repo,t._path),t._queryParams.getIndex()))}class Kn{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new Bp("value",this,new rt(e.snapshotNode,new Te(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new jp(this,e,n):null}matches(e){return e instanceof Kn?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function Vp(t,e,n,i,r){let o;if(typeof i=="object"&&(o=void 0,r=i),typeof i=="function"&&(o=i),r&&r.onlyOnce){const l=n,d=(p,c)=>{po(t._repo,t,a),l(p,c)};d.userCallback=n.userCallback,d.context=n.context,n=d}const s=new ha(n,o||void 0),a=new Kn(s);return Lp(t._repo,t,a),()=>po(t._repo,t,a)}function Me(t,e,n,i){return Vp(t,"value",e,n,i)}Bf(Te);Gf(Te);const qp="FIREBASE_DATABASE_EMULATOR_HOST",Ei={};let Gp=!1;function Kp(t,e,n,i){const r=e.lastIndexOf(":"),o=e.substring(0,r),s=Li(o);t.repoInfo_=new _s(e,s,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(t.authTokenProvider_=i)}function ya(t,e,n,i,r){let o=i||t.options.databaseURL;o===void 0&&(t.options.projectId||Ae("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),se("Using default host for project ",t.options.projectId),o=`${t.options.projectId}-default-rtdb.firebaseio.com`);let s=mo(o,r),a=s.repoInfo,l;typeof process<"u"&&Lr&&(l=Lr[qp]),l?(o=`http://${l}?ns=${a.namespace}`,s=mo(o,r),a=s.repoInfo):s.repoInfo.secure;const d=new nc(t.name,t.options,e);vp("Invalid Firebase Database URL",s),H(s.path)||Ae("Database URL must point to the root of a Firebase Database (not including a child path).");const p=Wp(a,t,d,new tc(t,n));return new ba(p,t)}function Yp(t,e){const n=Ei[e];(!n||n[t.key]!==t)&&Ae(`Database ${e}(${t.repoInfo_}) has already been deleted.`),zp(t),delete n[t.key]}function Wp(t,e,n,i){let r=Ei[e.name];r||(r={},Ei[e.name]=r);let o=r[t.toURLString()];return o&&Ae("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),o=new _p(t,Gp,n,i),r[t.toURLString()]=o,o}class ba{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(kp(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Te(this._repo,F())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Yp(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Ae("Cannot call "+e+" on a deleted database.")}}function wa(t=Ed(),e){const n=kd(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=ll("database");i&&xa(n,...i)}return n}function xa(t,e,n,i={}){t=Pe(t),t._checkNotDeleted("useEmulator");const r=`${e}:${n}`,o=t._repoInternal;if(t._instanceStarted){if(r===t._repoInternal.repoInfo_.host&&mn(i,o.repoInfo_.emulatorOptions))return;Ae("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let s;if(o.repoInfo_.nodeAdmin)i.mockUserToken&&Ae('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),s=new dn(dn.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:cl(i.mockUserToken,t.app.options.projectId);s=new dn(a)}Li(e)&&(dl(e),ml("Database",!0)),Kp(o,r,i,s)}function Jp(t){as($d),un(new Ot("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),o=e.getProvider("app-check-internal");return ya(i,r,o,n)},"PUBLIC").setMultipleInstances(!0)),pt(zr,Ar,t),pt(zr,Ar,"esm2020")}class _a{constructor(e,n){this.committed=e,this.snapshot=n}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function ka(t,e,n){if(t=Pe(t),Fe("Reference.transaction",t._path),t.key===".length"||t.key===".keys")throw"Reference.transaction failed: "+t.key+" is a read-only object.";const i=!0,r=new be,o=(a,l,d)=>{let p=null;a?r.reject(a):(p=new rt(d,new Te(t._repo,t._path),K),r.resolve(new _a(l,p)))},s=Me(t,()=>{});return Ap(t._repo,t._path,e,o,s,i),r.promise}Le.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};Le.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};Jp();const Qp=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:rt,Database:ba,OnDisconnect:ua,TransactionResult:_a,_QueryImpl:Gn,_QueryParams:An,_ReferenceImpl:Te,_repoManagerDatabaseFromApp:ya,_setSDKVersion:as,_validatePathString:lr,_validateWritablePath:Fe,child:xt,connectDatabaseEmulator:xa,get:va,getDatabase:wa,onDisconnect:Up,onValue:Me,push:ga,ref:ce,runTransaction:ka,set:rn,update:pr},Symbol.toStringTag,{value:"Module"}));let j=null,ge=!1,ln=null;function $t(t){try{if(!t)return!1;const e=JSON.parse(t),n=is(e);return j=wa(n),ge=!0,console.log("🔥 Firebase Realtime Database Initialized"),!0}catch(e){return console.error("Firebase init error:",e),!1}}let Ie={};function He(t,e){if(t===e)return!0;if(t==null||typeof t!="object"||e==null||typeof e!="object")return!1;const n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(let r of n)if(!i.includes(r)||!He(t[r],e[r]))return!1;return!0}function In(t){if(t){Ie={jobs:t.jobs?JSON.parse(JSON.stringify(t.jobs)):[],staff:t.staff?JSON.parse(JSON.stringify(t.staff)):[],financeMetadata:t.financeMetadata?JSON.parse(JSON.stringify(t.financeMetadata)):{},manualTransactions:t.manualTransactions?JSON.parse(JSON.stringify(t.manualTransactions)):[],settings:t.settings?JSON.parse(JSON.stringify(t.settings)):{},history:t.history?JSON.parse(JSON.stringify(t.history)):[],clients:t.clients?JSON.parse(JSON.stringify(t.clients)):[]};try{localStorage.setItem("haru_baseline",JSON.stringify(Ie))}catch(e){console.warn("Cannot save baseline to localStorage",e)}}}async function We(t){if(!(!ge||!j))try{const e=Array.isArray(t.portfolios)?t.portfolios:[];await ka(ce(j,"haru_state/portfolios"),r=>{const o=Array.isArray(r)?r:[],s=new Map,a=l=>{if(!l)return;const d=l.id||`PF-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,p=s.get(d);if(!p)s.set(d,{...l,id:d});else{const c=(p.thumbnail?1:0)+((p.images||[]).length>0?1:0),f=(l.thumbnail?1:0)+((l.images||[]).length>0?1:0);s.set(d,f>=c?{...p,...l,id:d}:{...l,...p,id:d})}};return o.forEach(a),e.forEach(a),Array.from(s.values())});const n={};let i=!1;if(Array.isArray(t.jobs)){const r=Ie.jobs||[],o=new Map(r.map(s=>[s.id,s]));t.jobs.forEach(s=>{if(s&&s.id){const a=o.get(s.id);(!a||!He(a,s))&&(n[`haru_state/jobs/${s.id}`]=s,i=!0)}})}if(Array.isArray(t.staff)){const r=Ie.staff||[],o=new Map(r.map(s=>[s.id||s.name,s]));t.staff.forEach(s=>{const a=s&&(s.id||s.name);if(a){const l=o.get(a);(!l||!He(l,s))&&(n[`haru_state/staff/${a}`]=s,i=!0)}})}He(Ie.financeMetadata,t.financeMetadata)||(n["haru_state/financeMetadata"]=t.financeMetadata||{},i=!0),He(Ie.manualTransactions,t.manualTransactions)||(n["haru_state/manualTransactions"]=t.manualTransactions||[],i=!0),He(Ie.settings,t.settings)||(n["haru_state/settings"]=t.settings||{},i=!0),He(Ie.clients,t.clients)||(n["haru_state/clients"]=t.clients||[],i=!0),He(Ie.history,t.history)||(n["haru_state/history"]=t.history||[],i=!0),i&&(n["haru_state/lastUpdated"]=Date.now(),await pr(ce(j),n),console.log("🔥 Firebase Diff-Based Update Xong! Bắn payload size:",Object.keys(n).length,"nodes"),In(t))}catch(e){console.error("Firebase sync error:",e)}}async function mr(){if(!ge||!j)return null;try{const t=await va(ce(j,"haru_state"));if(t.exists()){const e=t.val();return e.jobs&&typeof e.jobs=="object"&&!Array.isArray(e.jobs)&&(e.jobs=Object.values(e.jobs)),e.staff&&typeof e.staff=="object"&&!Array.isArray(e.staff)&&(e.staff=Object.values(e.staff)),e}}catch(t){console.error("Firebase load error:",t)}return null}async function Ta(t,e){if(!(!ge||!j))try{await rn(ce(j,`haru_state/locks/${t}`),e)}catch(n){console.warn("Lock job error:",n)}}async function Ca(t){if(!(!ge||!j))try{await rn(ce(j,`haru_state/locks/${t}`),null)}catch(e){console.warn("Unlock job error:",e)}}function Sa(t){if(!ge||!j)return()=>{};const e=ce(j,"haru_state/locks");return Me(e,n=>{t(n.val()||{})})}function $a(t){!ge||!j||!t||Yt(async()=>{const{onDisconnect:e}=await Promise.resolve().then(()=>Qp);return{onDisconnect:e}},void 0).then(({onDisconnect:e})=>{const n=ce(j,`haru_state/presence/${t}`),i=ce(j,".info/connected");Me(i,r=>{r.val()===!0&&e(n).remove().then(()=>{rn(n,{online:!0,last_active:Date.now()})})})}).catch(e=>console.warn("Lỗi tải onDisconnect:",e))}function Ea(t){if(!ge||!j)return()=>{};const e=ce(j,"haru_state/presence");return Me(e,n=>{t(n.val()||{})})}function Na(t){if(!ge||!j)return()=>{};ln&&(ln(),ln=null);const e=ce(j,"haru_state/portfolios"),n=Me(e,i=>{if(i.exists()){const r=i.val();Array.isArray(r)&&(console.log("🔥 [Real-time] Portfolios updated:",r.length,"albums"),t(r))}else t([])},i=>{console.warn("Firebase watchPortfolios error:",i)});return ln=n,n}async function hr(){if(!ge||!j)return!1;try{return await pr(ce(j,"haru_state"),{forceSyncAt:Date.now(),forceSyncBy:"admin"}),console.log("🚨 ForceSync triggered!"),!0}catch(t){return console.error("triggerForceSync error:",t),!1}}function Xp(t){if(!ge||!j)return()=>{};let e=null;const n=ce(j,"haru_state/forceSyncAt");return Me(n,r=>{const o=r.val();o&&o!==e&&(e!==null&&(console.log("🚨 [ForceSync] Signal received — reloading data..."),t(o)),e=o)},r=>{console.warn("watchForceSync error:",r)})}function Ia(t){if(!ge||!j)return()=>{};const e=ce(j,"haru_state");return Me(e,i=>{if(i.exists()){const r=i.val();r.jobs&&typeof r.jobs=="object"&&!Array.isArray(r.jobs)&&(r.jobs=Object.values(r.jobs)),r.staff&&typeof r.staff=="object"&&!Array.isArray(r.staff)&&(r.staff=Object.values(r.staff)),t(r)}},i=>{console.warn("watchFullState error:",i)})}async function Da(t,e){if(!ge||!j)return null;try{const n=ce(j,`haru_state/chats/${t}`),i={...e,time:Date.now()};return await ga(n,i),i}catch(n){return console.warn("sendChatMessage error:",n),null}}function La(t,e){if(!ge||!j)return()=>{};const n=ce(j,`haru_state/chats/${t}`);return Me(n,r=>{if(r.exists()){const o=r.val(),s=Object.values(o).sort((a,l)=>a.time-l.time);e(s)}else e([])})}const Zp=Object.freeze(Object.defineProperty({__proto__:null,initFirebase:$t,loadFromFirebase:mr,lockJob:Ta,sendChatMessage:Da,syncToFirebase:We,trackUserPresence:$a,triggerForceSync:hr,unlockJob:Ca,updateBaselineState:In,watchChat:La,watchForceSync:Xp,watchFullState:Ia,watchLocks:Sa,watchPortfolios:Na,watchPresence:Ea},Symbol.toStringTag,{value:"Module"})),ur="haru_state_v2",uo="haru_reset_2026_sync_v2",m={activePage:"dashboard",currentMonth:new Date().getMonth()+1,currentYear:new Date().getFullYear(),modal:{isOpen:!1,type:null,data:null},history:[{time:new Date().toISOString(),action:"Khởi tạo hệ thống",user:"Admin"}],notificationLog:[],deadlineFilter:"TẤT CẢ",staffFilter:"TẤT CẢ",statusFilter:"TẤT CẢ",searchQuery:"",extraMonth:null,staffViewMode:"all",editVideoFilter:"TẤT CẢ",editVideoMissingLink:!1,editPhotoMissingLink:!1,currentUser:null,syncLogs:[],lastSyncResult:null,jobs:[...pe.jobs],staff:[...pe.staff],gears:[...pe.gears||[]],gearBookings:[...pe.gearBookings||[]],leads:[...pe.leads||[]],financeMetadata:{...pe.financeMetadata},manualTransactions:[],settings:{taxRate:.1,depositPercent:.2,firebaseConfig:"",eventCategories:["QUAY PS","CHỤP PS","QUAY TT","CHỤP TT"],serviceRoles:["QUAY PS","CHỤP PS","QUAY TT","CHỤP TT","Quay Flycam","Editor","Hỗ trợ","Quản lý","Khác","CTV"],rates:pe.settings?.rates||{},accounts:[{username:"ADMIN",password:"2808",role:"admin",displayName:"Admin"},{username:"EDIT",password:"EDIT",role:"editor",displayName:"Editor"}]},clients:[],portfolios:[]};(function(){try{localStorage.getItem(uo)||(localStorage.removeItem("haru_state_v1"),localStorage.removeItem("haru_state_v2"),localStorage.removeItem("haru_theme"),localStorage.setItem(uo,"1"))}catch(e){console.warn("Cache reset skipped:",e.message)}})();function si(t){if(!t)return null;if(typeof t=="object")return t;try{return JSON.parse(t)}catch{return null}}function N(){try{const t={jobs:m.jobs,staff:m.staff,financeMetadata:m.financeMetadata,manualTransactions:m.manualTransactions||[],settings:m.settings||{},history:(m.history||[]).slice(0,200),clients:m.clients||[],portfolios:m.portfolios||[]};localStorage.setItem(ur,JSON.stringify(t)),We(m)}catch(t){console.warn("[Haru] Không thể lưu state:",t.message)}}function em(){document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("haru_theme","light")}em();window.requestNotifPermission=async()=>"Notification"in window?Notification.permission==="granted"?"granted":await Notification.requestPermission():"unsupported";window.sendNotification=(t,e,n="🔔")=>{"Notification"in window&&Notification.permission==="granted"&&new Notification(t,{body:e,icon:"/vite.svg",badge:"/vite.svg",tag:t}),tm(`${n} ${t}: ${e}`)};function tm(t){let e=document.getElementById("toast-container");e||(e=document.createElement("div"),e.id="toast-container",e.style.cssText="position:fixed;top:1rem;right:1rem;z-index:99999;display:flex;flex-direction:column;gap:0.5rem;max-width:360px",document.body.appendChild(e));const n=document.createElement("div");n.style.cssText="background:var(--bg-card,#fff);border:1px solid var(--border);border-left:4px solid #f59e0b;padding:0.6rem 1rem;border-radius:8px;font-size:0.82rem;color:var(--text-main);box-shadow:0 4px 12px rgba(0,0,0,0.15);animation:slideIn 0.3s ease;cursor:pointer",n.textContent=t,n.onclick=()=>n.remove(),e.appendChild(n),setTimeout(()=>n.remove(),8e3)}window.checkDeadlines=()=>{const t=new Date;t.setHours(0,0,0,0);const e=JSON.parse(localStorage.getItem("haru_notified")||"{}"),n=t.toISOString().split("T")[0];Object.keys(e).forEach(i=>{i<n&&delete e[i]}),m.jobs.forEach(i=>{if(i.status==="Đã hoàn thành")return;const r=new Date(i.date);r.setHours(0,0,0,0);const o=new Date(r);o.setDate(o.getDate()+15);const s=new Date(r);s.setDate(s.getDate()+30);const a=Math.ceil((o-t)/(1e3*60*60*24)),l=Math.ceil((s-t)/(1e3*60*60*24)),d=`${i.id}_${n}`;e[d]||(a<=0?(window.sendNotification("⚠️ TRỄ Photo",`${i.client} — trễ ${Math.abs(a)} ngày!`,"🚨"),e[d]=!0):a<=3&&(window.sendNotification("📸 Sắp hết hạn Photo",`${i.client} — còn ${a} ngày`,"⏰"),e[d]=!0),l<=0?(window.sendNotification("⚠️ TRỄ Video",`${i.client} — trễ ${Math.abs(l)} ngày!`,"🚨"),e[d]=!0):l<=5&&(window.sendNotification("🎬 Sắp hết hạn Video",`${i.client} — còn ${l} ngày`,"⏰"),e[d]=!0))}),localStorage.setItem("haru_notified",JSON.stringify(e))};setInterval(()=>{m.currentUser&&window.checkDeadlines()},1800*1e3);window.initSwipeActions=()=>{let t=0,e=0,n=0,i=!1,r=null,o=null,s=!1;document.addEventListener("touchstart",a=>{if(window.innerWidth>900)return;const l=a.target.closest(".swipe-container");l&&(o=l,r=l.querySelector(".swipe-content"),r&&(document.querySelectorAll(".swipe-content").forEach(d=>{if(d!==r){d.style.transform="translateX(0)";const p=d.closest(".swipe-container");p&&p.querySelectorAll(".swipe-action").forEach(c=>c.style.opacity="0")}}),t=a.touches[0].clientX,e=a.touches[0].clientY,i=!0,s=!1,r.style.transition="none"))},{passive:!0}),document.addEventListener("touchmove",a=>{if(!i||!r)return;const l=a.touches[0].clientY;n=a.touches[0].clientX;const d=n-t,p=l-e;if(Math.abs(p)>Math.abs(d)&&!s){i=!1;return}if(Math.abs(d)>10&&(s=!0,o.querySelectorAll(".swipe-action").forEach(c=>c.style.opacity="1")),s){let c=d;c>90&&(c=90+(c-90)*.2),c<-90&&(c=-90+(c+90)*.2),r.style.transform=`translateX(${c}px)`}},{passive:!0}),document.addEventListener("touchend",()=>{if(!i||!r){i=!1,r=null,o=null;return}i=!1,r.style.transition="transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)";const a=n-t,l=o.getAttribute("data-job-id"),d=o;if(a>75)r.style.transform="translateX(100px)",setTimeout(()=>{confirm("Bạn có chắc chắn muốn XÓA Job này?")?window.deleteJob&&window.deleteJob(l):(r.style.transform="translateX(0)",setTimeout(()=>{d&&d.querySelectorAll(".swipe-action").forEach(p=>p.style.opacity="0")},300))},300);else if(a<-75){r.style.transform="translateX(-100px)";const p=window.state?.jobs?.find(c=>c.id===l);setTimeout(()=>{p&&p.phone?window.location.href=`tel:${p.phone.replace(/[^0-9+]/g,"")}`:alert("Khách hàng này chưa có số điện thoại!"),r.style.transform="translateX(0)",setTimeout(()=>{d&&d.querySelectorAll(".swipe-action").forEach(c=>c.style.opacity="0")},300)},300)}else r.style.transform="translateX(0)",setTimeout(()=>{d&&d.querySelectorAll(".swipe-action").forEach(p=>p.style.opacity="0")},300);r=null,o=null})};setTimeout(()=>{window.initSwipeActions&&window.initSwipeActions()},1e3);async function nm(){let t=null;try{const d=localStorage.getItem(ur);if(d){const p=JSON.parse(d);if(Array.isArray(p.jobs)&&Array.isArray(p.staff)){const c=p.jobs.length,f=Array.isArray(pe.jobs)?pe.jobs.length:0;c>=Math.min(5,f||5)?(t=p,Object.assign(m,{jobs:t.jobs,staff:t.staff,financeMetadata:t.financeMetadata||m.financeMetadata,manualTransactions:t.manualTransactions||[],settings:t.settings||m.settings,history:t.history||m.history,clients:t.clients||[],portfolios:t.portfolios||[]})):console.warn("[Haru] Bỏ qua local cache vì dữ liệu quá ít:",c)}}}catch(d){console.warn("Local Load Err:",d)}let e=null;try{e=`{
  "apiKey": "AIzaSyCzyL0JG6gnSmmaSpUnCfMQJOiiNijQ4Gk",
  "authDomain": "haru-studio-6917a.firebaseapp.com",
  "databaseURL": "https://haru-studio-6917a-default-rtdb.firebaseio.com",
  "projectId": "haru-studio-6917a",
  "storageBucket": "haru-studio-6917a.firebasestorage.app",
  "messagingSenderId": "812528617751",
  "appId": "1:812528617751:web:656531dd61280113088f52",
  "measurementId": "G-S48GCMV34D"
}`,typeof e=="string"&&JSON.parse(e)}catch(d){console.warn("Invalid VITE_FIREBASE_CONFIG in .env",d),e=null}const n=si(window.HARU_PUBLIC_FIREBASE_CONFIG||window.HARU_FIREBASE_CONFIG),i=n||si(m.settings.firebaseConfig)||si(e);if(i&&i.databaseURL&&i.databaseURL.includes("asia-southeast1.firebasedatabase.app")){const d=i.projectId;d&&(i.databaseURL=`https://${d}-default-rtdb.firebaseio.com`,console.warn(`[Haru] Fixed databaseURL → ${i.databaseURL}`))}const r=urlParams.get("hub")==="haru"||!!urlParams.get("gallery"),o=!!i&&(m.settings.enableFirebaseSync===!0||!!e||!!n||r);let s=!1;if(o){const d=typeof i=="string"?i:JSON.stringify(i);if(m.settings.firebaseConfig=d,$t(d)){const c=await mr();if(console.log("🔥 PRE-MERGE FIREBASE DATA:",c?.portfolios),console.log("🔥 PRE-MERGE LOCAL DATA:",m.portfolios),c&&(c.jobs||c.staff||c.portfolios)){s=!0;let f=c.jobs||m.jobs;try{const u=localStorage.getItem("haru_baseline");if(t&&t.jobs&&u){const h=JSON.parse(u);if(h&&h.jobs){const v=JSON.stringify(t.jobs),g=JSON.stringify(h.jobs),_=JSON.stringify(c.jobs||[]),b=v!==g,y=_!==g&&_!==v;b&&y?setTimeout(()=>alert("⚠️ CẢNH BÁO XUNG ĐỘT DỮ LIỆU:\\Máy bạn có thay đổi ngoại tuyến, nhưng dữ liệu trên máy chủ cũng vừa bị thay đổi bởi người khác.\\\\Để tránh ghi đè làm mất dữ liệu của đồng nghiệp, hệ thống đã TẢI DỮ LIỆU TỪ MÁY CHỦ. Các thay đổi bạn vừa thực hiện lúc nãy có thể không được giữ lại. Xin vui lòng kiểm tra!"),2e3):b&&!y&&(f=t.jobs,console.log("♻️ Phát hiện thay đổi ngoại tuyến chưa được đồng bộ lền mây. Giữ lại bản Local, chuẩn bị Sync..."),setTimeout(()=>{window.syncToFirebase&&window.syncToFirebase(m)},3e3))}}}catch(u){console.warn("Conflict Resolution Error:",u)}Object.assign(m,{jobs:f,staff:c.staff||m.staff,financeMetadata:c.financeMetadata||m.financeMetadata,manualTransactions:c.manualTransactions||m.manualTransactions,settings:{...c.settings,firebaseConfig:d},history:c.history||m.history,clients:c.clients||m.clients,portfolios:c.portfolios||m.portfolios}),In(m),console.log("🔥 Đã tải dữ liệu mới nhất từ Firebase! Portfolios:",m.portfolios)}else console.log("🔥 Firebase init successful, but no fbData found.");if(!s&&(!Array.isArray(m.jobs)||m.jobs.length===0))try{console.log("🔄 Auto-fetching initial state from new_state.json (Fallback)...");const f=await fetch("/new_state.json?t="+Date.now());if(f.ok){const u=await f.json();m.jobs=u.jobs||[],u.staff&&u.staff.length>0&&(m.staff=u.staff),console.log("✅ Auto-loaded",m.jobs.length,"jobs from new_state.json successfully.")}else throw new Error("HTTP Fetch failed")}catch(f){console.warn("⚠️ Auto-fetch new_state.json failed, falling back to static mockData",f),m.jobs=[...pe.jobs],(!Array.isArray(m.staff)||m.staff.length===0)&&(m.staff=[...pe.staff]),(!Array.isArray(m.gears)||m.gears.length===0)&&(m.gears=[...pe.gears||[]]),(!Array.isArray(m.gearBookings)||m.gearBookings.length===0)&&(m.gearBookings=[...pe.gearBookings||[]]),(!Array.isArray(m.leads)||m.leads.length===0)&&(m.leads=[...pe.leads||[]])}Ia(f=>{if(!f||!f.jobs)return;const u=m.modal&&m.modal.isOpen;if(Object.assign(m,{jobs:f.jobs||m.jobs,staff:f.staff||m.staff,financeMetadata:f.financeMetadata||m.financeMetadata,manualTransactions:f.manualTransactions||m.manualTransactions,settings:{...f.settings,firebaseConfig:d},history:f.history||m.history,clients:f.clients||m.clients,portfolios:f.portfolios||m.portfolios}),In(m),!u)S();else{const h=m.modal.data,v=(f.jobs||[]).find(_=>_.id===h),g=m.jobs.find(_=>_.id===h);if(v&&g&&h){const _=["client","package","deposit","status","eventType","date","note"],b=[];_.forEach(y=>{JSON.stringify(v[y])!==JSON.stringify(g[y])&&b.push({field:y,local:g[y],remote:v[y]})}),b.length>0?im(h,b,g,v):window.showToast("⬇️ Dữ liệu vừa được đồng bộ ngầm. Sẽ hiển thị khi đóng hộp thoại.","var(--primary)")}else{const _=document.getElementById("toast-container");(!_||!_.innerHTML.includes("Dữ liệu vừa được đồng bộ"))&&window.showToast("⬇️ Dữ liệu vừa được đồng bộ ngầm. Sẽ hiển thị khi đóng hộp thoại.","var(--primary)")}}})}}Array.isArray(m.jobs)&&m.jobs.forEach(d=>{if(Array.isArray(d.services)){const p=new Set;d.services=d.services.filter(c=>{const f=`${c.service}_${c.staff}_${c.cost}_${c.date}`;return p.has(f)?!1:(p.add(f),!0)})}});let a=!1;m.jobs.forEach(d=>{if(!d.deliverables||d.deliverables.length===0){const p=[],c=(d.services||[]).filter(u=>(u.service||"").toLowerCase().includes("quay")).length;c===1?p.push({name:"Clip Phóng sự",type:"Video",quantity:1,editStatus:"Chưa bắt đầu"}):c>=2&&(p.push({name:"Clip Phóng sự",type:"Video",quantity:1,editStatus:"Chưa bắt đầu"}),p.push({name:"Clip Truyền thống",type:"Video",quantity:1,editStatus:"Chưa bắt đầu"}));const f=(d.services||[]).filter(u=>(u.service||"").toLowerCase().includes("chụp")).length;for(let u=0;u<f;u++)p.push({name:f===1?"Bộ Hình":`Bộ Hình ${u+1}`,type:"Photo",quantity:1,editStatus:"Chưa bắt đầu"});if(p.length>0){const u=(d.services||[]).find(v=>(v.service||"").toLowerCase().includes("quay"));u&&p.filter(v=>v.type==="Video").forEach(v=>{v.editor=u.editStaff||"",v.editStatus=u.editStatus||"Chưa bắt đầu",v.editDriveLink=u.editDriveLink||""});const h=(d.services||[]).find(v=>(v.service||"").toLowerCase().includes("chụp"));h&&p.filter(v=>v.type==="Photo").forEach(v=>{v.editor=h.editStaff||"",v.editStatus=h.editStatus||"Chưa bắt đầu",v.editDriveLink=h.editDriveLink||""}),d.deliverables=p,a=!0}}}),m.jobs.forEach(d=>{(d.deliverables||[]).forEach(p=>{p.name==="Ảnh Tiệc"&&(p.name="Ảnh Phóng sự")})}),a&&(console.log("[Haru] Migrated deliverables after data load"),N());try{const d=new Date;d.setHours(0,0,0,0);const p=new Date(d);p.setDate(p.getDate()+3);const c=m.jobs.filter(f=>{if(f.isTrash||(f.status||"").includes("hoàn thành"))return!1;const u=new Date(f.date);return u.setHours(0,0,0,0),u>=d&&u<=p}).sort((f,u)=>new Date(f.date)-new Date(u.date));if(c.length>0){const f=c.map(g=>`${g.client} (${new Date(g.date).toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"})})`).join(", "),u=`⚠️ ${c.length} job sắp đến: ${f}`;m.notificationLog||(m.notificationLog=[]);const h=d.toISOString().slice(0,10);m.notificationLog.some(g=>g.action===u&&(g.time||"").startsWith(h))||(m.notificationLog.unshift({time:new Date().toISOString(),action:u,user:"Tự động",read:!1}),m.notificationLog.length>50&&m.notificationLog.pop(),setTimeout(()=>{if(window.showToast)window.showToast(u,"var(--warning)");else{const g=document.createElement("div");g.style.cssText="position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);z-index:9999;background:#f59e0b;color:#fff;padding:0.6rem 1.25rem;border-radius:12px;font-size:0.85rem;font-weight:700;box-shadow:0 4px 20px rgba(0,0,0,0.15);max-width:90vw;text-align:center",g.textContent=u,document.body.appendChild(g),setTimeout(()=>{g.style.opacity="0",g.style.transition="opacity 0.4s",setTimeout(()=>g.remove(),400)},5e3)}},1500))}}catch(d){console.warn("[Haru] Reminder check error:",d)}S();const l=m.settings?.sheetSyncUrl||"";if(l&&(l.includes("script.google.com")||l.includes("script.googleusercontent.com")))try{const{runFullSync:d,getSyncLogs:p}=await Yt(async()=>{const{runFullSync:u,getSyncLogs:h}=await import("./sync-c2fKx2FG.js");return{runFullSync:u,getSyncLogs:h}},[]),c=await d(m.jobs,"/Volumes/HARUwedding",[],l);m.syncLogs=p(),m.lastSyncResult=c;const f=c.sheetAdded||0;f>0&&(console.log(`📊 Auto - sync: +${f} dự án mới từ Google Sheet`),N(),S())}catch(d){console.warn("Auto-sync Sheet error:",d.message)}if(m.currentUser?.role==="admin"){const d=m.settings.lastAutoBackup||0,p=10080*60*1e3;Date.now()-d>p&&m.jobs.length>0&&setTimeout(()=>{confirm(`⏳ Đã hơn 7 ngày hệ thống chưa được sao lưu.
Để phòng hờ rủi ro, hệ thống sẽ tải về tệp Backup (.json) ngay bây giờ nhé?`)&&(window.exportJSON?window.exportJSON():window.exportBackup&&window.exportBackup(),m.settings.lastAutoBackup=Date.now(),N())},4e3),setTimeout(()=>{const c=window.runHealthCheck(!0);c&&c.length>0&&(!m.settings.lastHealCheckNotified||Date.now()-m.settings.lastHealCheckNotified>1440*60*1e3)&&(window.addHistory("🤖 [CẢNH BÁO HỆ THỐNG] Phát hiện "+c.length+" nhóm mục dữ liệu bất thường.","Vui lòng vào màn hình Cài Đặt (Trung Tâm Quản Trị) > Health Check để quét chi tiết."),m.settings.lastHealCheckNotified=Date.now(),N())},5e3)}}window.addEventListener("online",()=>{console.log("🌐 Mạng đã kết nối lại. Bắt đầu đẩy dữ liệu offline lên mây..."),window.syncToFirebase&&window.state&&window.state.jobs.length>0&&window.syncToFirebase(window.state)});nm();setTimeout(()=>{try{if(!m.settings.teleEnable||!m.settings.teleBotToken||!m.settings.teleChatId)return;const t=new Date().toISOString().slice(0,10);if(localStorage.getItem("haru_last_remind")===t)return;const e=new Date;e.setDate(e.getDate()+1);const n=e.toISOString().slice(0,10),i=[],r=m.jobs.filter(a=>!a.isTrash&&a.date===n);r.length>0&&i.push(`📅 <b>NHẮC: ${r.length} JOB NGÀY MAI</b>
${r.map(a=>`• ${a.client} — ${a.eventType||"Sự kiện"}`).join(`
`)}`);const o=new Date;o.setHours(0,0,0,0);const s=[];if(m.jobs.forEach(a=>{a.isTrash||(a.services||[]).forEach(l=>{if(!(Array.isArray(l.service)?l.service.join(" "):l.service||"").toLowerCase().includes("quay")||l.editStatus==="Hoàn thành")return;const d=new Date(a.date);d.setDate(d.getDate()+20);const p=Math.ceil((d-o)/864e5);p<=3&&p>=0&&s.push(`• ${a.client} — ${l.editStaff||"Chưa assign"} — còn ${p} ngày`)})}),s.length>0&&i.push(`⚠️ <b>DEADLINE EDIT SẮP HẾT (≤3 ngày)</b>
${s.join(`
`)}`),i.length>0){const a=encodeURIComponent(i.join(`

`));fetch(`https://api.telegram.org/bot${m.settings.teleBotToken}/sendMessage?chat_id=${m.settings.teleChatId}&parse_mode=HTML&text=${a}`).then(l=>l.json()).then(l=>{l.ok&&(localStorage.setItem("haru_last_remind",t),console.log("🔔 Telegram reminder sent"))}).catch(()=>{})}else localStorage.setItem("haru_last_remind",t)}catch(t){console.warn("Telegram remind error:",t)}},5e3);const J=document.getElementById("app");window.addHistory=(t,e=null)=>{const n=JSON.parse(localStorage.getItem("haru_session")||"{}"),i={time:new Date().toISOString(),action:t,user:n.displayName||"Admin"};e&&(i.details=e),m.history.unshift(i),m.history.length>500&&(m.history=m.history.slice(0,500)),m.notificationLog||(m.notificationLog=[]),m.notificationLog.unshift({id:Date.now(),time:i.time,action:t,user:i.user,read:!1}),m.notificationLog.length>50&&(m.notificationLog=m.notificationLog.slice(0,50));const r=document.getElementById("notif-bell-badge");if(r){const o=m.notificationLog.filter(s=>!s.read).length;r.textContent=o>9?"9+":o,r.style.display=o>0?"flex":"none"}};window.showFloatingSaveStatus=t=>{let e=document.getElementById("haru-floating-save");e||(e=document.createElement("div"),e.id="haru-floating-save",e.style.cssText="position:fixed;bottom:1.25rem;left:50%;transform:translateX(-50%);z-index:99998;display:flex;align-items:center;gap:0.5rem;padding:0.45rem 1.1rem;border-radius:100px;font-size:0.82rem;font-weight:700;box-shadow:0 4px 20px rgba(0,0,0,0.15);transition:all 0.3s;pointer-events:none;opacity:0",document.body.appendChild(e)),clearTimeout(e._hideTimer),t==="saving"?(e.style.background="#3b82f6",e.style.color="#fff",e.innerHTML='<span style="animation:spin 1s linear infinite;display:inline-block">⟳</span> Đang lưu...',e.style.opacity="1"):t==="saved"?(e.style.background="#22c55e",e.style.color="#fff",e.innerHTML="✓ Đã đồng bộ",e.style.opacity="1",e._hideTimer=setTimeout(()=>{e.style.opacity="0"},3e3)):t==="error"&&(e.style.background="#ef4444",e.style.color="#fff",e.innerHTML="✕ Lỗi lưu dữ liệu",e.style.opacity="1",e._hideTimer=setTimeout(()=>{e.style.opacity="0"},4e3))};window.haruConfirm=(t,e)=>{const n=document.createElement("div");n.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:999999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);animation:fadeIn 0.2s";const i=document.createElement("div");i.style.cssText="background:var(--bg-card);padding:1.5rem;border-radius:16px;width:90%;max-width:320px;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,0.3);animation:slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",i.innerHTML=`
    <div style="font-size:3rem;margin-bottom:0.5rem;line-height:1">🗑️</div>
    <div style="font-weight:900;font-size:1.15rem;margin-bottom:0.5rem;color:var(--text-main)">Xác nhận xóa</div>
    <div style="font-size:0.9rem;color:var(--text-dim);margin-bottom:1.5rem;line-height:1.4">${t}</div>
    <div style="display:flex;gap:0.5rem">
      <button id="hc-cancel" style="flex:1;padding:0.7rem;border:1px solid var(--border);border-radius:8px;background:var(--bg-card);color:var(--text-main);font-weight:800;font-size:0.9rem;cursor:pointer">Hủy</button>
      <button id="hc-confirm" style="flex:1;padding:0.7rem;border:none;border-radius:8px;background:#ef4444;color:#fff;font-weight:800;font-size:0.9rem;cursor:pointer">Xóa ngay</button>
    </div>
  `,n.appendChild(i),document.body.appendChild(n),i.querySelector("#hc-cancel").onclick=()=>n.remove(),i.querySelector("#hc-confirm").onclick=()=>{n.remove(),e()}};window.markNotifsRead=()=>{if(!m.notificationLog)return;m.notificationLog.forEach(e=>{e.read=!0});const t=document.getElementById("notif-bell-badge");t&&(t.style.display="none"),S()};window.clearNotifLog=()=>{m.notificationLog=[],S()};window.toggleNotifPanel=()=>{const t=document.getElementById("notif-dropdown-panel");if(!t)return;const e=t.style.display!=="none";t.style.display=e?"none":"block",e||window.markNotifsRead()};window.setMissingLinkFilter=(t,e)=>{t==="video"?m.editVideoMissingLink=e:t==="photo"&&(m.editPhotoMissingLink=e),S()};window.exportBackup=()=>{const t=JSON.stringify(m,null,2),e=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(e),i=document.createElement("a"),r=new Date;i.href=n,i.download=`haru_backup_${r.getFullYear()}${String(r.getMonth()+1).padStart(2,"0")}${String(r.getDate()).padStart(2,"0")}_${String(r.getHours()).padStart(2,"0")}${String(r.getMinutes()).padStart(2,"0")}.json`,i.click(),URL.revokeObjectURL(n),window.addHistory("Xuất backup dữ liệu"),N()};window.importBackup=()=>{const t=document.createElement("input");t.type="file",t.accept=".json",t.onchange=e=>{const n=e.target.files[0];if(!n)return;const i=new FileReader;i.onload=r=>{try{const o=JSON.parse(r.target.result);if(!o.jobs||!Array.isArray(o.jobs)){alert("❌ File backup không hợp lệ (thiếu jobs)");return}if(!confirm(`⚠️ Nhập backup sẽ GHI ĐÈ toàn bộ dữ liệu hiện tại!

File: ${n.name} 
Số jobs: ${o.jobs.length} 
Số nhân sự: ${(o.staff||[]).length} 

Bạn chắc chắn ? `))return;Object.assign(m,o),m.history.unshift({time:new Date().toISOString(),action:`Nhập backup từ ${n.name} `,user:"Admin"}),N(),S()}catch(o){alert("❌ Lỗi đọc file: "+o.message)}},i.readAsText(n)},t.click()};window.addComment=(t,e,n=null)=>{const i=m.jobs.find(o=>o.id===t);if(!i||!e.trim())return;i.comments||(i.comments=[]);const r=JSON.parse(localStorage.getItem("haru_session")||"{}");i.comments.push({user:r.displayName||"Admin",text:e.trim(),time:new Date().toISOString(),service:n||null}),N()};let Se=null;window.openChat=t=>{const e=m.jobs.find(f=>f.id===t);if(!e)return;Se&&(Se(),Se=null);const n=document.getElementById("chat-panel-overlay");n&&n.remove();const i=document.createElement("div");i.id="chat-panel-overlay",i.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;justify-content:flex-end",i.onclick=f=>{f.target===i&&(Se&&(Se(),Se=null),i.remove())};const r=JSON.parse(localStorage.getItem("haru_session")||"{}"),o=document.documentElement.getAttribute("data-theme")==="dark",s=o?"#162816":"#fff",a=o?"#0f1f0f":"#f8fdf8",l=r.displayName||"Admin",d=document.createElement("div");d.style.cssText=`width:380px;max-width:90vw;background:${s};height:100%;display:flex;flex-direction:column;box-shadow:-4px 0 24px rgba(0,0,0,0.2);animation:slideIn 0.2s ease`,d.innerHTML=`
    <div style="padding:1rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
      <div>
        <h3 style="font-size:1rem;font-weight:800;color:var(--text-main)">💬 ${e.client}</h3>
        <span id="chat-count" style="font-size:0.72rem;color:var(--text-dim)">Đang tải...</span>
      </div>
      <button id="chat-close-btn" style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:var(--text-dim)">✕</button>
    </div>
    <div id="chat-messages" style="flex:1;overflow-y:auto;padding:0.8rem;display:flex;flex-direction:column;gap:0.5rem">
      <div style="text-align:center;color:var(--text-dim);font-size:0.8rem;margin-top:2rem">⏳ Đang tải tin nhắn...</div>
    </div>
    <div style="padding:0.6rem;border-top:1px solid var(--border);display:flex;gap:0.4rem">
      <input id="chat-input" type="text" placeholder="Nhập ghi chú..." style="flex:1;padding:0.5rem 0.8rem;border:1px solid var(--border);border-radius:8px;font-family:inherit;font-size:0.85rem;background:${a};color:var(--text-main)" />
      <button id="chat-send-btn" style="background:var(--primary);color:#fff;border:none;padding:0.5rem 1rem;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit;font-size:0.85rem">Gửi</button>
    </div>
  `,i.appendChild(d),document.body.appendChild(i),document.getElementById("chat-close-btn").onclick=()=>{Se&&(Se(),Se=null),i.remove()};const p=f=>{const u=document.getElementById("chat-messages"),h=document.getElementById("chat-count");if(u){if(h&&(h.textContent=`${f.length} tin nhắn`),f.length===0){u.innerHTML='<div style="text-align:center;color:var(--text-dim);font-size:0.8rem;margin-top:2rem">Chưa có tin nhắn nào.<br>Gửi ghi chú đầu tiên!</div>';return}u.innerHTML=f.map(v=>{const g=v.user===l;return`<div style="display:flex;flex-direction:column;align-items:${g?"flex-end":"flex-start"};max-width:85%${g?";align-self:flex-end":""}">
        <div style="font-size:0.6rem;color:var(--text-dim);margin-bottom:0.15rem">${v.user} · ${new Date(v.time).toLocaleString("vi-VN")}</div>
        <div style="background:${g?"var(--primary-glow)":"var(--accent-soft)"};padding:0.5rem 0.8rem;border-radius:${g?"12px 12px 0 12px":"12px 12px 12px 0"};font-size:0.82rem;color:var(--text-main);line-height:1.4">${v.text}</div>
        ${v.service?`<span style="font-size:0.55rem;color:var(--text-dim);margin-top:0.1rem">📹 ${v.service}</span>`:""}
      </div>`}).join(""),u.scrollTop=u.scrollHeight}};Se=La(t,f=>{f.length>0?p(f):p(e.comments||[])});const c=async()=>{const f=document.getElementById("chat-input");if(!f||!f.value.trim())return;const u=f.value.trim();f.value="",await Da(t,{user:l,text:u})||(window.addComment(t,u),p(e.comments||[]))};document.getElementById("chat-send-btn").onclick=c,document.getElementById("chat-input").onkeydown=f=>{f.key==="Enter"&&c()},document.getElementById("chat-input").focus()};function im(t,e,n,i){document.getElementById("conflict-dialog")?.remove();const r={client:"Tên khách",package:"Gói",deposit:"Cọc",status:"Trạng thái",eventType:"Loại sự kiện",date:"Ngày",note:"Ghi chú"},o=e.map(a=>`
    <div style="display:grid;grid-template-columns:100px 1fr 1fr;gap:0.5rem;padding:0.5rem 0;border-bottom:1px solid #f1f5f9;font-size:0.8rem">
      <div style="font-weight:700;color:#64748b">${r[a.field]||a.field}</div>
      <div style="background:#fef2f2;padding:0.3rem 0.5rem;border-radius:6px;color:#b91c1c;word-break:break-word">📱 ${a.local??"(trống)"}</div>
      <div style="background:#f0fdf4;padding:0.3rem 0.5rem;border-radius:6px;color:#16a34a;word-break:break-word">☁️ ${a.remote??"(trống)"}</div>
    </div>
  `).join(""),s=document.createElement("div");s.id="conflict-dialog",s.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem",s.innerHTML=`
    <div style="background:#fff;border-radius:16px;max-width:520px;width:100%;box-shadow:0 25px 50px rgba(0,0,0,0.15);overflow:hidden">
      <div style="background:linear-gradient(135deg,#fef3c7,#fde68a);padding:1rem 1.5rem;display:flex;align-items:center;gap:0.75rem">
        <span style="font-size:1.5rem">⚠️</span>
        <div>
          <h3 style="margin:0;font-size:1rem;font-weight:900;color:#92400e">Phát Hiện Xung Đột</h3>
          <p style="margin:0;font-size:0.75rem;color:#a16207">Người khác vừa sửa job này</p>
        </div>
      </div>
      <div style="padding:1rem 1.5rem">
        <div style="display:grid;grid-template-columns:100px 1fr 1fr;gap:0.5rem;padding-bottom:0.5rem;font-size:0.65rem;font-weight:700;color:#94a3b8;text-transform:uppercase">
          <div>Trường</div>
          <div>📱 Bản của bạn</div>
          <div>☁️ Bản từ máy khác</div>
        </div>
        ${o}
      </div>
      <div style="padding:1rem 1.5rem;display:flex;gap:0.5rem;border-top:1px solid #f1f5f9">
        <button id="conflict-keep" style="flex:1;padding:0.6rem;border:2px solid #ef4444;background:#fff;border-radius:10px;font-weight:800;font-size:0.8rem;cursor:pointer;color:#ef4444">📱 Giữ của tôi</button>
        <button id="conflict-take" style="flex:1;padding:0.6rem;border:none;background:#16a34a;border-radius:10px;font-weight:800;font-size:0.8rem;cursor:pointer;color:#fff">☁️ Nhận bản mới</button>
        <button id="conflict-cancel" style="padding:0.6rem 1rem;border:1px solid #e2e8f0;background:#f8fafc;border-radius:10px;font-weight:700;font-size:0.8rem;cursor:pointer;color:#64748b">✕</button>
      </div>
    </div>
  `,document.body.appendChild(s),document.getElementById("conflict-keep").onclick=()=>{s.remove(),N(),window.showToast("📱 Đã giữ bản của bạn & đẩy lên mây.","var(--primary)")},document.getElementById("conflict-take").onclick=()=>{const a=m.jobs.findIndex(l=>l.id===t);a!==-1&&(m.jobs[a]={...i},N(),window.closeModal(),S(),setTimeout(()=>window.openModal?.("job_detail",t),300)),s.remove(),window.showToast("☁️ Đã nhận bản mới từ máy khác.","var(--primary)")},document.getElementById("conflict-cancel").onclick=()=>s.remove()}function za(t){const e=document.getElementById("form-validation-errors");e?(e.innerHTML=t.map(n=>`< div >• ${n}</div > `).join(""),e.style.display="block",setTimeout(()=>{e.style.display="none"},6e3)):alert(`⚠️ Kiểm tra lại thông tin:

• `+t.join(`
• `))}window.navigate=t=>{m.activePage=t,m.modal.isOpen=!1,S()};window.emergencySync=async()=>{const t=document.getElementById("emergency-sync-btn");t&&(t.disabled=!0,t.innerHTML="⟳",t.style.animation="spin 1s linear infinite"),window.showFloatingSaveStatus("saving");try{await We(m),await hr(),window.showFloatingSaveStatus("saved"),t&&(t.disabled=!1,t.innerHTML="🚨",t.style.animation=""),window.showToast&&window.showToast("✅ Đã đồng bộ khẩn cấp! Tất cả thiết bị đang cập nhật...")}catch(e){window.showFloatingSaveStatus("error"),t&&(t.disabled=!1,t.innerHTML="🚨",t.style.animation=""),console.error("Emergency sync error:",e)}};window.migrateLocalToFirebase=async()=>{const t=m.portfolios||[];if(t.length===0){alert("⚠️ Không có portfolio nào trong local để migrate!");return}if(await new Promise(n=>{window.haruConfirm?window.haruConfirm(`Migrate ${t.length} album lên Firebase để tất cả thiết bị thấy?`,()=>n(!0)):n(confirm(`Migrate ${t.length} album lên Firebase?`))})){window.showFloatingSaveStatus("saving");try{await We(m),await hr(),window.showFloatingSaveStatus("saved"),window.showToast&&window.showToast(`🚀 Đã migrate ${t.length} album lên Firebase! Tất cả thiết bị đang cập nhật...`)}catch(n){window.showFloatingSaveStatus("error"),alert("❌ Lỗi migrate: "+n.message)}}};window.openModal=(t,e=null)=>{if(t==="job_detail"&&e){const n=e.id||e,i=window.state?.locks?.[n],r=m.currentUser?.username||"Unknown";if(i&&i!==r){window.showToast&&window.showToast(`🔒 Không thể chỉnh sửa! Job đang được khóa bởi ${i}`,"var(--danger)");return}window.lockJob&&window.lockJob(n,r)}m.modal.isOpen=!0,m.modal.type=t,m.modal.data=e,S()};window.openQuickPreview=t=>window.openModal("quick_preview",t);window.closeModal=()=>{if(m.modal.type==="quick_preview"&&window._quickPreviewCloseFn){window._quickPreviewCloseFn();return}m.modal.type==="job_detail"&&m.modal.data&&window.unlockJob&&window.unlockJob(m.modal.data.id||m.modal.data),m.modal.isOpen=!1,m.modal.type=null,m.modal.data=null,m.globalSearchQuery="",m.globalSearchResults=[],S()};window.checkStaffConflict=(t,e,n=null)=>{if(!t||t==="Chưa xếp"||t===""||!e)return[];const i=[],r=new Date(e);return r.setHours(0,0,0,0),m.jobs.forEach(o=>{if(o.isTrash||o.status==="Đã hoàn thành"||o.id===n)return;let s=!1;if(o.eventDays&&o.eventDays.length>0)o.eventDays.forEach((a,l)=>{const d=new Date(a.date||o.date);d.setHours(0,0,0,0),d.getTime()===r.getTime()&&(o.services||[]).filter(c=>c.date===(a.date||o.date)||!c.date&&l===0).some(c=>c.staff&&c.staff.toLowerCase().includes(t.toLowerCase()))&&(s=!0)});else{const a=new Date(o.date);a.setHours(0,0,0,0),a.getTime()===r.getTime()&&(o.services||[]).some(l=>l.staff&&l.staff.toLowerCase().includes(t.toLowerCase()))&&(s=!0)}s&&i.push(o)}),i};window._checkConflictUI=t=>{const e=t.value;let n=t.getAttribute("data-date");if(!n||n==="undefined"){const a=(t.closest(".form-group")||t.closest(".day-tab-content")||document).querySelector('input[type="date"]');a&&(n=a.value)}const i=t.getAttribute("data-job-id"),r=t.parentElement.querySelector(".conflict-warning");if(!r)return;if(e==="Chưa xếp"||e===""||!n){r.style.display="none";return}const o=window.checkStaffConflict(e,n,i);if(o.length>0){const s=o.map(a=>`#${a.jobNo||a.id.slice(0,4)} ${a.client}`).join(", ");r.innerHTML=`⚠️ Trùng: ${s}`,r.style.display="block"}else r.style.display="none"};window.openGlobalSearch=()=>{m.globalSearchQuery="",m.globalSearchResults=[],window.openModal("global_search")};window._handleGlobalSearchInput=t=>{if(m.globalSearchQuery=t,t.startsWith(">")){const e=t.slice(1).trim().toLowerCase();m.globalSearchResults=[],m.globalSearchCommandHint=e,S();return}if(m.globalSearchCommandHint=null,!t||t.length<2)m.globalSearchResults=[];else{const e=t.toLowerCase();m.globalSearchResults=m.jobs.filter(n=>!n.isTrash&&(n.client.toLowerCase().includes(e)||n.phone&&n.phone.includes(e)||n.id.toLowerCase().includes(e)||n.venue&&n.venue.toLowerCase().includes(e))).slice(0,50)}S()};window._executeCommand=t=>{window.closeModal(),setTimeout(()=>{t.includes("tạo")||t.includes("tao")||t.includes("job")||t.includes("thêm")||t.includes("them")?window.openModal("add_job"):t.includes("lịch")||t.includes("lich")||t.includes("calendar")?window.navigate("calendar"):t.includes("kanban")?window.navigate("kanban"):t.includes("analytics")||t.includes("thống")||t.includes("thong")?window.navigate("analytics"):t.includes("edit video")||t.includes("video")?window.navigate("edit_video"):t.includes("ảnh")||t.includes("photo")?window.navigate("edit_photo"):t.includes("nhân sự")||t.includes("nhan su")||t.includes("staff")?window.navigate("staff"):(t.includes("tài chính")||t.includes("tai chinh")||t.includes("finance"))&&window.navigate("finance")},100)};window.bulkMarkDone=t=>{if(!t||t.length===0)return;let e=0;t.forEach(n=>{const[i,r]=n.split("::"),o=m.jobs.find(l=>l.id===i);if(!o)return;const s=parseInt(r,10),a=o.deliverables?.[s];a&&a.editStatus!=="Hoàn thành"&&(a.editStatus="Hoàn thành",e++)}),e>0&&(window.addHistory(`Đánh dấu hoàn thành hàng loạt: ${e} thành phẩm`),N(),window.showFloatingSaveStatus("saved"),S())};window._syncBulkBar=()=>{const t=[...document.querySelectorAll(".ev-multi-cb:checked")];let e=document.getElementById("haru-bulk-bar");if(t.length===0){e&&e.remove();return}e||(e=document.createElement("div"),e.id="haru-bulk-bar",e.style.cssText="position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);z-index:99997;background:#1e293b;color:#fff;padding:0.6rem 1.2rem;border-radius:100px;display:flex;align-items:center;gap:0.8rem;font-size:0.85rem;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,0.25);animation:slideIn 0.25s ease",document.body.appendChild(e));const n=t.map(i=>i.dataset.key);e.innerHTML=`<span style="background:rgba(255,255,255,0.15);padding:0.2rem 0.6rem;border-radius:20px">${t.length} đã chọn</span>
    <button onclick="window.bulkMarkDone(${JSON.stringify(n)})" style="background:#22c55e;color:#fff;border:none;padding:0.35rem 1rem;border-radius:20px;font-weight:800;font-size:0.8rem;cursor:pointer">✅ Đánh dấu Hoàn thành</button>
    <button onclick="document.querySelectorAll('.ev-multi-cb').forEach(cb=>cb.checked=false);window._syncBulkBar()" style="background:rgba(255,255,255,0.1);color:#fff;border:none;padding:0.35rem 0.7rem;border-radius:20px;font-size:0.8rem;cursor:pointer">✕</button>`};window._jumpToJob=t=>{const e=m.jobs.find(i=>i.id===t);if(!e)return;const n=new Date(e.date);m.currentMonth=n.getMonth()+1,m.currentYear=n.getFullYear(),window.navigate("dashboard"),window.openModal("job_detail",{id:t})};document.addEventListener("keydown",t=>{(t.metaKey||t.ctrlKey)&&t.key==="k"&&(t.preventDefault(),m.modal.isOpen&&m.modal.type==="global_search"?window.closeModal():window.openGlobalSearch())});window.updateClientRating=(t,e)=>{const n=m.jobs.find(i=>i.id===t);n&&(n.clientRating=parseInt(e),N(),S())};window.toggleJobComplete=t=>{const e=m.jobs.find(n=>n.id===t);e&&(e.status=e.status==="Đã hoàn thành"||e.status==="Nhận Feedback"?"Sắp diễn ra":"Đã hoàn thành",N(),S(),window.addHistory&&window.addHistory(`${e.client}: ${e.status} `))};window.toggleClientTag=(t,e)=>{const n=m.jobs.find(i=>i.id===t);if(n){n.clientTags||(n.clientTags=[]);const i=n.clientTags.indexOf(e);i>=0?n.clientTags.splice(i,1):n.clientTags.push(e),N(),S()}};function Aa(t,e=[]){const n=[];return(!t.client||String(t.client).trim()==="")&&n.push("Tên khách hàng (CD-CR) không được để trống"),t.date||n.push("Ngày tổ chức không được để trống"),t.package!==void 0&&t.package!==""&&Number(t.package)<0&&n.push("Giá trị gói không được là số âm"),e.length>0&&e.filter(r=>r.staff&&r.staff!=="").length===0&&n.push("Cần chọn nhân sự cho mỗi dòng dịch vụ đã thêm"),n}window.addJob=t=>{const e=Aa(t,t.services||[]);if(t.timeline&&(t.timeline.le_sang&&!t.timeline.le&&e.push("Lễ sáng: cần nhập giờ bắt đầu"),t.timeline.tiec_trua&&!t.timeline.tiec_trua_time&&e.push("Tiệc trưa: cần nhập giờ bắt đầu"),t.timeline.tiec_toi&&!t.timeline.tiec&&e.push("Tiệc tối: cần nhập giờ bắt đầu")),e.length>0){za(e);return}if(t.id=t.id||lm(),m.jobs.push(t),window.addHistory(`Thêm dự án mới: ${t.client} (${t.id})`),N(),S(),m.settings.teleEnable&&m.settings.teleBotToken&&m.settings.teleChatId){const n=new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}),i=`🚨 <b>CÓ JOB MỚI CHỐT</b> 🚨%0A%0A👤 <b>Khách hàng:</b> ${t.client}%0A📅 <b>Ngày sự kiện:</b> ${new Date(t.date).toLocaleDateString("vi-VN")}%0A📸 <b>Loại dịch vụ:</b> ${t.eventType||"Chưa rõ"}%0A💰 <b>Giá trị HĐ:</b> ${n.format(t.package||0)}%0A💸 <b>Đã cọc:</b> ${n.format(t.deposit||0)}%0A%0ATeam chuẩn bị chiến thảo nào! 🔥`;fetch(`https://api.telegram.org/bot${m.settings.teleBotToken}/sendMessage?chat_id=${m.settings.teleChatId}&parse_mode=HTML&text=${i}`).then(r=>r.json()).then(r=>{r.ok?console.log("Đã gửi thông báo Telegram thành công."):console.error("Lỗi gửi Telegram:",r)}).catch(r=>console.error("Lỗi mạng Telegram:",r))}if(m.settings.driveEnable&&m.settings.driveClientSecret&&m.settings.driveParentId){const n=m.settings.driveClientSecret;if(n.startsWith("https://script.google.com")){const i=`${t.id}_${t.client}_${new Date(t.date).toLocaleDateString("vi-VN").replace(/\//g,"-")}`;fetch(n,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"createFolder",folderName:i,parentFolderId:m.settings.driveParentId,jobId:t.id})}).then(()=>{console.log(`Đã gửi lệnh tạo folder Drive: ${i}`)}).catch(r=>console.error("Lỗi gọi Drive API:",r))}}};window.cloneJobAsTemplate=t=>{const e=m.jobs.find(i=>i.id===t);if(!e){window.showToast?.("Không tìm thấy job gốc","error");return}const n=JSON.parse(JSON.stringify(e));n.id="TPL"+Date.now().toString(36).toUpperCase(),n.client=e.client+" (Copy)",n.date=new Date().toISOString().slice(0,10),n.status="Mới",n.deposit=0,n.checklist={},n.comments=[],n.clientRating=0,n.clientTags=[],n.isCompleted=!1,n.completedDate=null,(n.services||[]).forEach(i=>{i.paid=!1,i.editStatus="Chưa bắt đầu",i.editPaid=!1}),m.jobs.push(n),window.addHistory(`📋 Clone template từ: ${e.client} → ${n.client}`),N(),S(),window.showToast?.(`📋 Đã tạo bản sao: ${n.client}`,"success"),setTimeout(()=>window.openModal?.("job_detail",n.id),300)};window.shareJobLink=t=>{const n=`${window.location.origin+window.location.pathname}?view=${t}`;navigator.clipboard.writeText(n).then(()=>{window.showToast?.("📤 Đã copy link chia sẻ!","success")}).catch(()=>{prompt("Copy link này:",n)})};(function(){const n=new URLSearchParams(window.location.search).get("view");if(!n)return;const i=setInterval(()=>{if(!m.jobs.length)return;clearInterval(i);const r=m.jobs.find(o=>o.id===n);if(!r){document.getElementById("app").innerHTML=`
        <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui">
          <div style="text-align:center;padding:2rem">
            <div style="font-size:3rem;margin-bottom:1rem">🔍</div>
            <h2>Không tìm thấy dự án</h2>
            <p style="color:#666">Link này không hợp lệ hoặc dự án đã bị xoá.</p>
          </div>
        </div>`;return}Yt(()=>Promise.resolve().then(()=>Qa),void 0).then(o=>{const s=o.renderClientProgressView(r);document.getElementById("app").innerHTML="",document.getElementById("app").appendChild(s),document.title=`Tiến độ: ${r.client} — Haru Studio`})},500)})();window.updateJob=(t,e,n=!1)=>{const i=m.jobs.findIndex(r=>r.id===t);if(i!==-1){const r=m.jobs[i],o={};for(let l in e)JSON.stringify(r[l])!==JSON.stringify(e[l])&&(o[l]=e[l]);const s=window.state?.currentUser?.displayName||window.state?.currentUser?.username||"Unknown";e.lastModifiedBy=s,e.lastModifiedTime=new Date().toISOString(),m.jobs[i]={...m.jobs[i],...e};const a=Object.keys(o).length>0?JSON.stringify(o):null;if(window.addHistory(`Cập nhật dự án: ${m.jobs[i].client}`,a),N(),m.settings.zaloEnable&&m.settings.zaloToken&&m.settings.zaloTemplateId&&(o.date||o.venue)){const l=m.jobs[i].phone?m.jobs[i].phone.replace(/^0/,"84"):null;if(l){const d={phone:l,template_id:m.settings.zaloTemplateId,template_data:{customer_name:m.jobs[i].client,event_date:new Date(m.jobs[i].date).toLocaleDateString("vi-VN"),event_venue:m.jobs[i].venue||"Studio"}};fetch("https://business.openapi.zalo.me/message/template",{method:"POST",headers:{"Content-Type":"application/json",access_token:m.settings.zaloToken},body:JSON.stringify(d)}).then(p=>p.json()).then(p=>{p.error?console.error("Lỗi bắn ZNS Zalo:",p):console.log(`Đã gửi ZNS nhắc lịch tới: ${l}`)}).catch(p=>console.error("Zalo API Error:",p))}}n||S()}};window.saveJobDetail=(t,e=!0)=>{const n=m.jobs.find(k=>k.id===t);if(!n)return;const i=(k,z)=>{const E=document.getElementById(k);return E!=null?E.value:z},r=(k,z)=>{const E=document.getElementById(k);return E!=null?E.value===""?0:parseInt(E.value)||0:z},o=i("edit-job-client",n.client),s=i("edit-job-status",n.status),a=i("edit-job-date",n.date),l=i("edit-job-type",n.eventType),d=i("edit-job-phone",n.phone),p=r("edit-job-package",n.package),c=r("edit-job-deposit",n.deposit||0),f=i("edit-job-notes",n.notes),u=i("edit-job-link-customer",n.linkCustomer),h=i("edit-job-link-nas",n.linkNAS),v=i("edit-job-link-drive",n.linkDrive),g=document.querySelector(".modal-container"),_=g?.querySelectorAll(".day-tab-content")||[],b=[],y=[];_.forEach((k,z)=>{const E=k.querySelector(".day-label-input")?.value||"",O=k.querySelector(".day-date-input")?.value||"",Z=k.querySelector(".day-boy-house-input")?.value||"",A=k.querySelector(".day-girl-house-input")?.value||"",le=k.querySelector(".day-venue-input")?.value||"",ee=k.querySelectorAll(".day-tl-check"),te=k.querySelectorAll(".day-tl-time"),Ce={le_sang:!1,le:"05:00",tiec_trua:!1,tiec_trua_time:"11:00",tiec_toi:!1,tiec:"18:00"};ee.forEach(Q=>{const fe=Q.getAttribute("data-tl");fe&&(Ce[fe]=Q.checked)}),te.forEach(Q=>{const fe=Q.getAttribute("data-tl-time");fe&&(Ce[fe]=Q.value)});const lt=k.querySelectorAll(".day-cat-check"),Ne=[];lt.forEach(Q=>{Q.checked&&Ne.push(Q.value)}),b.push({dayLabel:E,date:O,boyHouse:Z,girlHouse:A,venue:le,timeline:Ce,categories:Ne}),k.querySelectorAll(".day-service-row").forEach(Q=>{const fe=Q.querySelector(".svc-role-input"),on=Q.querySelector(".svc-staff-input"),Ha=Q.querySelector(".svc-cost-input"),Ra=Q.querySelector(".svc-edit-input"),vr=fe?Array.from(fe.selectedOptions).map(Ba=>Ba.value):[],yr=on?on.value.trim():"",Oa=parseInt(Ha?.value)||0,Fa=parseInt(Ra?.value)||0;let br=!1;const Yn=Q.getAttribute("data-sidx");Yn!=null&&n.services&&n.services[Yn]&&(br=!!n.services[Yn].paid),vr.length>0&&yr&&y.push({service:vr,staff:yr,cost:Oa,edit:Fa,paid:br,date:O})})});const x=b.length>0?b:n.eventDays||[],T=x[0]||{},$=T.date||a,I=T.venue||n.venue||"",B=T.timeline||n.timeline||{};let P=y.length>0?y:n.services||[];const X=g?.querySelectorAll(".deliverable-row")||[],ie=[];X.forEach((k,z)=>{const E=k.querySelector(".del-name-input"),O=k.querySelector(".del-type-input"),Z=k.querySelector(".del-editor-input"),A=k.querySelector(".del-qty-input"),le=n.deliverables&&n.deliverables[z]?n.deliverables[z]:{},ee=E?E.value.trim():"",te=O?O.value.trim():"Khác",Ce=Z?Z.value.trim():le.editor||"",lt=parseInt(A?.value)||1;ee&&ie.push({...le,name:ee,type:te,editor:Ce,quantity:lt})});const w=Aa({client:o,date:$,package:p},P);if(w.length>0){za(w);return}window.updateJob(t,{client:o,status:s,date:$,eventType:l,phone:d,package:p,deposit:c,venue:I,notes:f,linkCustomer:u,linkNAS:h,linkDrive:v,timeline:B,services:P,eventDays:x,deliverables:ie},!e),e&&window.closeModal(),window.showFloatingSaveStatus("saved")};window.addJobComment=t=>{const e=document.getElementById("job-chat-input");if(!e)return;const n=e.value.trim();if(!n)return;const i=m.jobs.find(a=>a.id===t);if(!i)return;i.comments||(i.comments=[]);const o={user:window.state?.currentUser?.displayName||window.state?.currentUser?.username||"Ẩn danh",text:n,time:new Date().toISOString()};i.comments.push(o),N(),e.value="";const s=document.getElementById("job-chat-messages");if(s){const a=new Date(o.time).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),l=`
      <div style="display: flex; flex-direction: column; gap: 0.2rem; align-items: flex-end">
         <div style="font-size: 0.65rem; color: var(--text-dim); font-weight: 700; padding: 0 0.2rem">${o.user} <span style="font-weight: 400; opacity: 0.8">• ${a}</span></div>
         <div style="background: var(--primary); color: #fff; padding: 0.5rem 0.75rem; border-radius: 12px; font-size: 0.85rem; max-width: 90%; line-height: 1.4; word-wrap: break-word; border-bottom-right-radius: 2px">${o.text}</div>
      </div>
    `;i.comments.length===1&&(s.innerHTML=""),s.insertAdjacentHTML("beforeend",l),s.scrollTop=s.scrollHeight}};window._switchDayTab=t=>{const e=document.querySelectorAll("#event-day-tabs .day-tab-btn:not(.add-day-btn)"),n=document.querySelectorAll("#event-day-contents .day-tab-content");e.forEach(i=>i.classList.remove("active")),n.forEach(i=>i.classList.remove("active")),e[t]&&e[t].classList.add("active"),n[t]&&n[t].classList.add("active")};window._addDayTab=()=>{const t=document.getElementById("event-day-contents"),e=document.getElementById("event-day-tabs");if(!t||!e)return;const i=t.querySelectorAll(".day-tab-content").length,r="Ngày "+(i+1),o=e.querySelector(".add-day-btn"),s=document.createElement("button");s.type="button",s.className="day-tab-btn",s.setAttribute("data-day-idx",i),s.textContent=r,s.onclick=()=>window._switchDayTab(i),e.insertBefore(s,o);const a=document.createElement("div");a.className="day-tab-content",a.setAttribute("data-day-idx",i),a.innerHTML=`
          < div class="day-form-panel" >
      <div class="day-header">
        <h4>📋 ${r}</h4>
        <button type="button" class="remove-day-btn" onclick="window._removeDayTab(${i})">✕ Xóa ngày này</button>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem">
        <div>
          <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Tên nhãn ngày</label>
          <input type="text" class="form-control day-label-input" data-day="${i}" value="${r}" placeholder="VD: Lễ gia tiên, Tiệc cưới..."
            style="font-size: 0.92rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--primary); font-weight: 700">
        </div>
        <div>
          <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Ngày tổ chức</label>
          <input type="date" class="form-control day-date-input" data-day="${i}"
            style="font-size: 0.92rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main)">
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem">
        <div>
          <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">🏠 Nhà Trai</label>
          <input type="text" class="form-control day-boy-house-input" data-day="${i}" placeholder="Địa chỉ nhà trai"
            style="font-size: 0.88rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main)">
        </div>
        <div>
          <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">🏠 Nhà Gái</label>
          <input type="text" class="form-control day-girl-house-input" data-day="${i}" placeholder="Địa chỉ nhà gái"
            style="font-size: 0.88rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main)">
        </div>
        <div>
          <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">🏨 Venue / Tiệc</label>
          <input type="text" class="form-control day-venue-input" data-day="${i}" placeholder="Nhà hàng / địa điểm"
            style="font-size: 0.88rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--accent); font-weight: 700">
        </div>
      </div>
      <div>
        <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.4rem">⏰ Lịch trình</label>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.6rem">
          <div style="background: #fff; border: 1.5px solid var(--border); border-radius: 10px; padding: 0.6rem">
            <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; font-weight: 700; color: var(--text-dim); margin-bottom: 0.35rem; cursor: pointer">
              <input type="checkbox" class="day-tl-check" data-day="${i}" data-tl="le_sang"> Lễ sáng
            </label>
            <input type="time" class="form-control day-tl-time" data-day="${i}" data-tl-time="le" value="05:00"
              style="padding: 0.25rem 0.4rem; font-size: 0.85rem; font-weight: 700; background: #fff; border: 1px solid var(--border); color: #f97316">
          </div>
          <div style="background: #fff; border: 1.5px solid var(--border); border-radius: 10px; padding: 0.6rem">
            <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; font-weight: 700; color: var(--text-dim); margin-bottom: 0.35rem; cursor: pointer">
              <input type="checkbox" class="day-tl-check" data-day="${i}" data-tl="tiec_trua"> Tiệc trưa
            </label>
            <input type="time" class="form-control day-tl-time" data-day="${i}" data-tl-time="tiec_trua_time" value="11:00"
              style="padding: 0.25rem 0.4rem; font-size: 0.85rem; font-weight: 700; background: #fff; border: 1px solid var(--border); color: #22c55e">
          </div>
          <div style="background: #fff; border: 1.5px solid var(--border); border-radius: 10px; padding: 0.6rem">
            <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; font-weight: 700; color: var(--text-dim); margin-bottom: 0.35rem; cursor: pointer">
              <input type="checkbox" class="day-tl-check" data-day="${i}" data-tl="tiec_toi"> Tiệc tối
            </label>
            <input type="time" class="form-control day-tl-time" data-day="${i}" data-tl-time="tiec" value="18:00"
              style="padding: 0.25rem 0.4rem; font-size: 0.85rem; font-weight: 700; background: #fff; border: 1px solid var(--border); color: #3b82f6">
          </div>
        </div>
      </div>
      <div>
        <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.4rem">🎬 Hạng mục quay/chụp</label>
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem">
          ${(window.state?.settings?.eventCategories||[]).map(d=>`<label style="display: flex; align-items: center; gap: 0.3rem; font-size: 0.78rem; font-weight: 700; padding: 0.3rem 0.65rem; border-radius: 8px; cursor: pointer; border: 1.5px solid var(--border); background: #fff; color: var(--text-dim); transition: all 0.2s">
            <input type="checkbox" class="day-cat-check" data-day="${i}" value="${d}" style="display:none"> ${d}
          </label>`).join("")}
        </div>
      </div>
    </div >
          `,t.appendChild(a);const l=t.querySelector('.day-tab-content[data-day-idx="0"] .day-header');if(l&&!l.querySelector(".remove-day-btn")){const d=document.createElement("button");d.type="button",d.className="remove-day-btn",d.textContent="✕ Xóa ngày này",d.onclick=()=>window._removeDayTab(0),l.appendChild(d)}window._switchDayTab(i)};window._removeDayTab=t=>{const e=document.getElementById("event-day-contents"),n=document.getElementById("event-day-tabs");if(!e||!n)return;const i=e.querySelectorAll(".day-tab-content"),r=n.querySelectorAll(".day-tab-btn:not(.add-day-btn)");if(i.length<=1){alert("Không thể xóa ngày cuối cùng");return}if(!confirm("Xóa ngày này khỏi lịch trình?"))return;i[t]&&i[t].remove(),r[t]&&r[t].remove();const o=e.querySelectorAll(".day-tab-content"),s=n.querySelectorAll(".day-tab-btn:not(.add-day-btn)");if(o.forEach((a,l)=>a.setAttribute("data-day-idx",l)),s.forEach((a,l)=>{a.setAttribute("data-day-idx",l),a.onclick=()=>window._switchDayTab(l)}),o.length===1){const a=o[0].querySelector(".remove-day-btn");a&&a.remove()}window._switchDayTab(0)};window.toggleTrash=t=>{const e=m.jobs.find(n=>n.id===t);e&&(e.isTrash=!e.isTrash,window.addHistory(`${e.isTrash?"Xóa":"Khôi phục"} dự án: ${e.client} `),N(),S())};window.deleteJob=t=>{window.haruConfirm("Bạn có chắc chắn muốn xóa dự án này vào thùng rác không? Bạn có thể khôi phục lại trong cài đặt.",()=>{const e=m.jobs.find(n=>n.id===t);if(!e){console.error("[Haru] Job not found:",t);return}e.isTrash=!0,window.addHistory(`Xóa dự án: ${e.client}`),N(),console.log(`[Haru] Đã xóa dự án: ${e.client} (id: ${t})`),document.querySelectorAll(".modal-overlay").forEach(n=>n.remove()),m.modal.isOpen=!1,m.modal.type=null,m.modal.data=null,window._quickPreviewCloseFn=null,S()})};window.toggleServicePaid=(t,e,n,i)=>{const r=m.jobs.find(s=>s.id===t);if(!r||!r.services[e]){i&&(i.checked=!n);return}const o=r.services[e].paid;r.services[e].paid=n;try{N()}catch{r.services[e].paid=o,i&&(i.checked=o),Ee("❌ Lỗi lưu dữ liệu – đã hoàn tác","var(--danger)");return}if(rm(r.services[e].staff),i){const s=i.closest("tr");s&&(s.style.background=n?"rgba(21,128,61,0.06)":"")}Ee(n?"✓ Đã đánh dấu thanh toán":"● Đã bỏ đánh dấu thanh toán",n?"var(--success)":"var(--text-dim)"),window.addHistory(`${n?"Đánh dấu":"Bỏ"} thanh toán: ${r.client} — ${r.services[e].staff} `)};function rm(t){if(!t)return;const e=m.jobs.filter(l=>!l.isTrash&&l.services.some(d=>(Array.isArray(d.staff)?d.staff.join(", "):d.staff||"").includes(t))),n=e.reduce((l,d)=>l+d.services.filter(p=>(Array.isArray(p.staff)?p.staff.join(", "):p.staff||"").includes(t)).reduce((p,c)=>p+(c.cost||0),0),0),i=e.reduce((l,d)=>l+d.services.filter(p=>(Array.isArray(p.staff)?p.staff.join(", "):p.staff||"").includes(t)&&p.paid).reduce((p,c)=>p+(c.cost||0),0),0),r=n-i,o=l=>new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(l),s=document.getElementById(`staff-card-${t.replace(/'/g,"\\'")}`);if(!s)return;const a=s.querySelectorAll(".payment-metric");a[0]&&(a[0].textContent=o(n)),a[1]&&(a[1].textContent=o(i)),a[2]&&(a[2].textContent=o(r))}function Ee(t,e){const n=document.getElementById("haru-pay-toast");n&&n.remove();const i=document.createElement("div");i.id="haru-pay-toast",i.style.cssText=`
        position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9999;
        background: ${e}; color: #fff;
        padding: 0.6rem 1.25rem; border-radius: 100px;
        font-size: 0.9rem; font-weight: 700;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        pointer-events: none;
        `,i.textContent=t,document.body.appendChild(i),setTimeout(()=>{i.style.opacity="0",i.style.transition="opacity 0.3s",setTimeout(()=>i.remove(),300)},2200)}window.showPaymentToast=Ee;window.updateReportMeta=(t,e,n)=>{m.financeMetadata[t]||(m.financeMetadata[t]={}),m.financeMetadata[t].ads=parseInt(e)||0,m.financeMetadata[t].office=parseInt(n)||0,window.addHistory(`Cập nhật chi phí tháng: ${t} `),N(),S()};window.saveMonthlyReport=t=>{const e=document.getElementById(`ads - input - ${t} `),n=document.getElementById(`off - input - ${t} `);if(!e||!n)return;window.updateReportMeta(t,e.value,n.value);const i=document.createElement("div");i.style.cssText="position:fixed;bottom:2rem;right:2rem;background:#22c55e;color:#fff;padding:0.75rem 1.5rem;border-radius:12px;font-weight:700;z-index:9999;font-size:0.9rem",i.textContent="✓ Đã lưu chi phí tháng",document.body.appendChild(i),setTimeout(()=>i.remove(),3e3)};window.viewPA3Report=t=>{window.openModal("pa3_report",t)};window.updateTaxRate=t=>{const e=parseFloat(t);if(isNaN(e)||e<0||e>1){alert("Thuế suất phải từ 0 đến 1 (VD: 0.1 = 10%)");return}m.settings||(m.settings={}),m.settings.taxRate=e,window.addHistory(`Cập nhật thuế suất: ${(e*100).toFixed(1)}% `),N(),S()};window.updateEditStatus=(t,e,n,i=!1)=>{const r=m.jobs.find(d=>d.id===t);if(!r)return;const o=parseInt(e,10),s=r.deliverables?.[o];if(!s)return;const a=s.editStatus;s.editStatus=n,(r.deliverables||[]).every(d=>(d.editStatus||"")==="Hoàn thành")&&n==="Hoàn thành"&&r.deliverables&&r.deliverables.length>0&&(r.status="Đã hoàn thành");try{N()}catch{s.editStatus=a,Ee("❌ Lỗi lưu – đã hoàn tác","var(--danger)");return}window.addHistory(`Cập nhật trạng thái edit: ${r.client} – ${s.name} → ${n}`),Ee(`✓ Cập nhật: ${n}`,n==="Hoàn thành"?"var(--success)":"var(--primary)"),i||setTimeout(()=>S(),350)};window.updateVideoEditor=(t,e,n)=>{const i=m.jobs.find(o=>o.id===t);if(!i)return;const r=i.deliverables?.[parseInt(e,10)];r&&(r.editor=n,N(),window.addHistory(`Gán editor: ${n} cho ${i.client} – ${r.name}`),Ee(`✓ Editor: ${n||"Đã xóa"}`,"var(--primary)"))};window.updateVideoEditStatus=(t,e,n,i=!1)=>{const r=m.jobs.find(s=>s.id===t);if(!r)return;const o=r.deliverables?.[parseInt(e,10)];o&&(o.editStatus=n,n==="Hoàn thành"&&(r.deliverables||[]).every(a=>(a.editStatus||"")==="Hoàn thành")&&r.deliverables&&r.deliverables.length>0&&(r.status="Đã hoàn thành"),N(),window.addHistory(`Edit video: ${r.client} – ${o.name} → ${n}`),Ee(`✓ ${n}`,n==="Hoàn thành"?"var(--success)":"var(--primary)"),i||S())};window.deleteVideoClip=(t,e)=>{const n=m.jobs.find(o=>o.id===t);if(!n)return;const i=parseInt(e,10),r=n.deliverables?.[i];r&&(n.deliverables.splice(i,1),N(),window.addHistory(`Xoá thành phẩm: ${n.client} – ${r.name}`),Ee("🗑️ Đã xoá thành phẩm","var(--danger)"),S())};window.updateVideoEditLink=(t,e,n)=>{const i=m.jobs.find(o=>o.id===t);if(!i)return;const r=i.deliverables?.[parseInt(e,10)];r&&r.editDriveLink!==n&&(r.editDriveLink=n,N(),n&&(window.addHistory(`Thêm link Drive: ${i.client} – ${r.name}`),Ee("✓ Đã lưu link Drive","var(--success)")))};window.updateEditorChecklist=(t,e,n,i)=>{const r=m.jobs.find(s=>s.id===t);if(!r)return;const o=r.deliverables?.[parseInt(e,10)];o&&(o.editChecklist||(o.editChecklist={footage:!1,rough:!1,color:!1,audio:!1,export:!1}),o.editChecklist[n]=i,N())};window.updateEditorNote=(t,e,n)=>{const i=m.jobs.find(o=>o.id===t);if(!i)return;const r=i.deliverables?.[parseInt(e,10)];r&&(r.editorNote=n,N())};window.updateJobLink=(t,e,n)=>{const i=m.jobs.find(r=>r.id===t);i&&(i[e]=n,N(),n&&Ee("✓ Đã lưu link","var(--success)"))};window.markJobFullyPaid=t=>{if(!confirm("Xác nhận khách đã thanh toán toàn bộ số tiền còn lại (Cọc = Giá gói)?"))return;const e=m.jobs.find(i=>i.id===t);if(!e)return;e.deposit=e.package,N(),window.addHistory(`Xác nhận khách đã tất toán (${e.package.toLocaleString()}đ): ${e.client}`);const n=document.getElementById("edit-job-deposit");n&&(n.value=e.package,window.saveJobDetail(t,!1)),S()};window.toggleJobChecklist=(t,e,n)=>{const i=m.jobs.find(r=>r.id===t);i&&(i.checklist||(i.checklist={}),i.checklist[e]=n,N(),window._firebaseSyncEnabled!==!1&&Yt(()=>Promise.resolve().then(()=>Zp),void 0).then(r=>{r.syncToFirebase&&r.syncToFirebase(m)}).catch(()=>{}))};window.addStaff=t=>{if(!t.name||t.name.trim()===""){alert("Vui lòng nhập tên nhân sự");return}if(m.staff.find(n=>n.name.trim().toLowerCase()===t.name.trim().toLowerCase())){alert(`Nhân sự "${t.name}" đã tồn tại`);return}m.staff.push({name:t.name.trim(),role:t.role||"CTV",phone:t.phone||"",bank:t.bank||{no:"",name:"",bank:""},note:t.note||""}),window.addHistory(`Thêm nhân sự: ${t.name} `),N(),S()};window.promptAddStaff=()=>{const t=document.getElementById("staff-add-form");t&&(t.style.display=t.style.display==="none"?"block":"none")};window.submitAddStaff=()=>{const t=document.getElementById("staff-add-name")?.value?.trim(),e=document.getElementById("staff-add-role"),n=e?Array.from(e.selectedOptions).map(a=>a.value):["CTV"],i=document.getElementById("staff-add-phone")?.value?.trim()||"",r=document.getElementById("staff-add-bankno")?.value?.trim()||"",o=document.getElementById("staff-add-bankname")?.value?.trim()||"",s=document.getElementById("staff-add-bank")?.value?.trim()||"";window.addStaff({name:t,role:n,phone:i,bank:{no:r,name:o,bank:s}})};window.promptEditStaff=t=>{const e=t.replace(/\s/g,"-"),n=document.getElementById(`staff-edit-${e}`);n&&(n.style.display=n.style.display==="none"?"block":"none")};window.submitEditStaff=t=>{const e=m.staff.find(d=>d.name===t);if(!e){alert("Không tìm thấy nhân sự");return}const n=document.getElementById(`edit-name-${t}`)?.value?.trim()||e.name,i=document.getElementById(`edit-role-${t}`),r=i?Array.from(i.selectedOptions).map(d=>d.value):e.role,o=document.getElementById(`edit-phone-${t}`)?.value?.trim()??e.phone,s=document.getElementById(`edit-bankno-${t}`)?.value?.trim()||"",a=document.getElementById(`edit-bankname-${t}`)?.value?.trim()||"",l=document.getElementById(`edit-bank-${t}`)?.value?.trim()||"";e.name=n,e.role=r,e.phone=o,e.bank={no:s,name:a,bank:l},window.addHistory(`Sửa nhân sự: ${t} → ${n}`),N(),S()};window.deleteStaff=t=>{window.removeStaff(t)};window.quickAddCTV=()=>{const t=prompt("Tên CTV:")?.trim();if(!t)return;const e=(prompt("SĐT CTV (có thể để trống):")||"").trim(),n=(prompt("Vai trò (mặc định CTV):","CTV")||"CTV").trim(),i=(prompt("Ghi chú (không bắt buộc):")||"").trim();window.addStaff({name:t,phone:e,role:n,note:i,bank:{no:"",name:t,bank:""}})};window.removeStaff=t=>{if((m.currentUser?.role||"")!=="admin"){alert("Chỉ Admin mới có quyền xóa nhân sự.");return}confirm(`Xóa nhân sự "${t}" khỏi hệ thống ?

Lưu ý: Dữ liệu công việc liên quan vẫn được giữ.`)&&(m.staff=m.staff.filter(n=>n.name!==t),window.addHistory(`Xóa nhân sự: ${t} `),N(),S())};window.showEditStaff=t=>{const e=document.getElementById(`edit-form-${t}`);e&&(e.style.display=e.style.display==="none"?"block":"none")};window.saveStaffEdit=t=>{const e=m.staff.find(a=>a.name===t);if(!e)return;const n=document.getElementById(`edit-name-${t}`)?.value?.trim()||e.name,i=document.getElementById(`edit-role-${t}`)?.value||e.role,r=document.getElementById(`edit-phone-${t}`)?.value||e.phone,o=document.getElementById(`edit-bankno-${t}`)?.value||"",s=document.getElementById(`edit-bankname-${t}`)?.value||"";if(!n){alert("Tên nhân sự không được để trống");return}e.name=n,e.role=i,e.phone=r,e.bank={no:o,name:e.bank?.name||n,bank:s},window.addHistory(`Cập nhật nhân sự: ${n} `),N(),S()};window.setStaffViewMode=t=>{m.staffViewMode=t,S()};window.setDeadlineFilter=t=>{m.deadlineFilter=t,S()};window.setStaffFilter=t=>{m.staffFilter=t,S()};window.setStatusFilter=t=>{m.statusFilter=t,S()};window.setSearchQuery=t=>{m.searchQuery=t,S()};window.setEditVideoFilter=t=>{m.editVideoFilter=t,S()};window.setEditPhotoFilter=t=>{m.editPhotoFilter=t,S()};window.setEditPhotoStatusFilter=t=>{m.editPhotoStatusFilter=t,S()};window.toggleEditPhotoView=t=>{m.editPhotoView=t,S()};window.setEditVideoStatusFilter=t=>{m.editVideoStatusFilter=t,S()};window.toggleEditVideoView=t=>{m.editVideoView=t,S()};window.setKanbanEditorFilter=t=>{m.kanbanEditorFilter=t,S()};window.addTransaction=t=>{if(m.manualTransactions||(m.manualTransactions=[]),!t.description||t.description.trim()===""){alert("Vui lòng nhập nội dung giao dịch");return}if(!t.amount||parseInt(t.amount)<=0){alert("Số tiền phải > 0");return}m.manualTransactions.push({id:Date.now(),date:t.date||new Date().toISOString().split("T")[0],description:t.description||"",amount:parseInt(t.amount)||0,type:t.type||"chi",category:t.category||"Khác"}),window.addHistory(`Thêm giao dịch: ${t.description} `),N(),S()};window.deleteTransaction=t=>{confirm("Bạn có chắc muốn xóa giao dịch này?")&&(m.manualTransactions=m.manualTransactions.filter(e=>e.id!==t),window.addHistory("Xóa giao dịch thủ công"),N(),S())};window.exportCSV=()=>{const t=[["Ngày","Dự án","Khách hàng","Nội dung","Loại","Số tiền","Trạng thái"]];m.jobs.filter(o=>!o.isTrash).forEach(o=>{o.services.forEach(s=>{t.push([o.date,o.id,o.client,`${s.service} - ${Array.isArray(s.staff)?s.staff.join(", "):s.staff} `,"Chi thợ",s.cost,s.paid?"Đã trả":"Chưa trả"])}),t.push([o.date,o.id,o.client,"Gói dịch vụ","Thu",o.package,"Đã ký"])}),m.manualTransactions&&m.manualTransactions.forEach(o=>t.push([o.date,"-","-",o.description,o.type,o.amount,"-"]));const e=t.map(o=>o.map(s=>`"${String(s).replace(/"/g,'""')}"`).join(",")).join(`
`),n=new Blob(["\uFEFF"+e],{type:"text/csv;charset=utf-8;"}),i=URL.createObjectURL(n),r=document.createElement("a");r.href=i,r.download=`haru_finance_T${m.currentMonth}_${m.currentYear}.csv`,r.click(),URL.revokeObjectURL(i),window.addHistory("Xuất CSV tài chính")};window.exportJSON=()=>{const t={jobs:m.jobs,staff:m.staff,financeMetadata:m.financeMetadata,manualTransactions:m.manualTransactions||[],settings:m.settings},e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(e),i=document.createElement("a");i.href=n,i.download=`haru_backup_${new Date().toISOString().slice(0,10)}.json`,i.click(),URL.revokeObjectURL(n),window.addHistory("Xuất backup JSON")};window.importJSON=()=>{const t=document.createElement("input");t.type="file",t.accept=".json",t.onchange=e=>{const n=e.target.files[0];if(!n)return;const i=new FileReader;i.onload=r=>{try{const o=JSON.parse(r.target.result);if(!Array.isArray(o.jobs))throw new Error("Định dạng không hợp lệ (thiếu jobs)");o.jobs&&(m.jobs=o.jobs),o.staff&&(m.staff=o.staff),o.financeMetadata&&(m.financeMetadata=o.financeMetadata),o.manualTransactions&&(m.manualTransactions=o.manualTransactions),o.settings&&(m.settings={...m.settings,...o.settings}),window.addHistory(`Nhập backup từ ${n.name} (${o.jobs.length} dự án)`),N(),S(),alert(`✓ Nhập thành công!
${o.jobs.length} dự án, ${(o.staff||[]).length} nhân sự`)}catch(o){alert(`❌ Lỗi đọc file JSON:
`+o.message)}},i.readAsText(n)},t.click()};window.resetAllData=()=>{!confirm(`⚠️ CẢNH BÁO: Xóa toàn bộ dữ liệu?

Hành động này KHÔNG THỂ hoàn tác!
Hãy Export JSON trước khi tiếp tục.`)||!confirm("Xác nhận lần 2: Bạn chắc chắn muốn xóa TẤT CẢ dữ liệu?")||(m.jobs=[],m.staff=[],m.manualTransactions=[],m.financeMetadata={},m.history=[{time:new Date().toISOString(),action:"Reset toàn bộ dữ liệu",user:"Admin"}],localStorage.removeItem(ur),S())};window.addServiceRowInModal=()=>{const t=document.getElementById("services-table-edit");if(!t)return;const e=t.querySelector("tbody");if(!e)return;const n=m.staff.map(r=>`<option value="${r.name}">${r.name}</option>`).join(""),i=document.createElement("tr");i.innerHTML=`
    <td><select class="form-control" style="font-size:0.8rem;padding:0.3rem">
      ${(window.state?.settings?.serviceRoles||[]).map(r=>`<option>${r}</option>`).join("")}
    </select></td>
    <td><select class="form-control" style="font-size:0.8rem;padding:0.3rem">
      <option value="">-- Chọn thợ --</option>${n}
    </select></td>
    <td><input type="number" class="form-control" value="0" style="font-size:0.8rem;padding:0.3rem"></td>
    <td><input type="number" class="form-control" value="0" style="font-size:0.8rem;padding:0.3rem"></td>
    <td><input type="checkbox" class="service-paid-check"></td>
  `,e.appendChild(i)};window.removeServiceRowInModal=()=>{const t=document.querySelector("#services-table-edit tbody");if(!t||t.rows.length<=1){alert("Phải có ít nhất 1 dòng dịch vụ");return}t.removeChild(t.lastElementChild)};window.runSync=async()=>{try{const t=document.getElementById("sync-sheet-url"),e=document.getElementById("sync-nas-root"),n=document.getElementById("sync-drive-api"),i=t?t.value.trim():"",r=e&&e.value.trim()?e.value.trim():"/Volumes/HARUwedding",o=n?n.value.trim():"",{runFullSync:s,getSyncLogs:a}=await Yt(async()=>{const{runFullSync:c,getSyncLogs:f}=await import("./sync-c2fKx2FG.js");return{runFullSync:c,getSyncLogs:f}},[]);document.body.style.cursor="wait",t&&(t.disabled=!0),e&&(e.disabled=!0),n&&(n.disabled=!0);let l=[];if(o)try{const c=await fetch(o);if(!c.ok)throw new Error(`Drive API HTTP ${c.status}`);const f=await c.json();Array.isArray(f)?l=f:Array.isArray(f.folders)?l=f.folders:Array.isArray(f.data)&&(l=f.data)}catch(c){console.warn("Drive folders API error:",c.message)}const d=await s(m.jobs,r,l,i);i&&(m.settings||(m.settings={}),m.settings.sheetSyncUrl=i),document.body.style.cursor="default",t&&(t.disabled=!1),e&&(e.disabled=!1),n&&(n.disabled=!1),m.syncLogs=a(),m.lastSyncResult=d;const p=d.nasAdded+d.driveAdded+(d.sheetAdded||0);window.addHistory(`Sync hoàn tất: +${p} mục mới`),N(),S()}catch(t){document.body.style.cursor="default";const e=document.getElementById("sync-sheet-url"),n=document.getElementById("sync-nas-root"),i=document.getElementById("sync-drive-api");e&&(e.disabled=!1),n&&(n.disabled=!1),i&&(i.disabled=!1),console.error("Sync error:",t),alert("Lỗi sync: "+t.message)}};window.sendZaloReminder=(t,e)=>{const n=m.jobs.find(l=>l.id===t);if(!n)return;const i=n.services[e];if(!i||!i.staff)return;const r=m.staff.find(l=>l.name===i.staff);if(!r||!r.phone){alert(`Vui lòng cập nhật Số điện thoại (Zalo) cho nhân sự ${i.staff} trong tab Nhân Sự trước khi gửi!`);return}const o=new Date(n.date).toLocaleDateString("vi-VN");let s="";if(n.timeline){const l=[];n.timeline.le_sang&&n.timeline.le&&l.push(`Lễ: ${n.timeline.le}`),n.timeline.tiec_trua&&n.timeline.tiec_trua_time&&l.push(`Tiệc trưa: ${n.timeline.tiec_trua_time}`),n.timeline.tiec_toi&&n.timeline.tiec&&l.push(`Tiệc tối: ${n.timeline.tiec}`),l.length>0&&(s=`
⏰ Thời gian:
- ${l.join(`
- `)}`)}const a=`LỊCH ĐI SHOW HARU STUDIO 📸

📌 Khách hàng: ${n.client}
📅 Ngày: ${o}${s}
📍 Địa điểm: ${n.venue||"Chưa cập nhật"}

🎬 Nhiệm vụ của bạn: ${i.service}
💰 Thù lao (tạm tính): ${new Intl.NumberFormat("vi-VN").format(i.cost)}đ

Vui lòng confirm lại tin nhắn này nhé!`;navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(a).then(()=>{window.open(`https://zalo.me/${r.phone}`,"_blank"),window.addHistory(`Đã tạo lịch Zalo cho ${r.name} (Job ${n.client})`),alert(`✅ Đã COPY tin nhắn nhắc lịch!

Trình duyệt sẽ mở cuộc trò chuyện Zalo của `+r.name+", bạn chỉ cần bấm Dán (Ctrl+V / Cmd+V) để gửi đi.")}).catch(l=>{alert(`Không thể copy tự động, bạn hãy làm bằng tay:

`+a)}):(alert(`Vui lòng copy đoạn sau và gửi qua Zalo:

`+a),window.open(`https://zalo.me/${r.phone}`,"_blank"))};window.saveStudioInfo=()=>{const t=document.getElementById("setting-studio-name")?.value?.trim(),e=document.getElementById("setting-studio-phone")?.value?.trim(),n=document.getElementById("setting-studio-address")?.value?.trim();m.settings.studioName=t||"Haru Wedding Film",m.settings.studioPhone=e||"",m.settings.studioAddress=n||"",window.addHistory("Cập nhật thông tin Studio"),N(),window.showFloatingSaveStatus("saved")};window._debugLogs=[];const om=console.log,sm=console.warn,am=console.error;console.log=(...t)=>{window._debugLogs.push({level:"log",msg:t.map(String).join(" "),time:new Date().toLocaleTimeString()}),window._debugLogs.length>100&&window._debugLogs.shift(),om(...t)};console.warn=(...t)=>{window._debugLogs.push({level:"warn",msg:t.map(String).join(" "),time:new Date().toLocaleTimeString()}),window._debugLogs.length>100&&window._debugLogs.shift(),sm(...t)};console.error=(...t)=>{window._debugLogs.push({level:"error",msg:t.map(String).join(" "),time:new Date().toLocaleTimeString()}),window._debugLogs.length>100&&window._debugLogs.shift(),am(...t)};window.runHealthCheck=(t=!1)=>{const e=[],n=m.jobs.filter(f=>!f.isTrash),i=n.filter(f=>!f.client||f.client.trim()==="");i.length&&e.push({type:"🧑‍🤝‍🧑",msg:`${i.length} job thiếu Tên Khách Hàng`,items:i.map(f=>f.id||f.jobNo||"Không xác định")});const r=n.filter(f=>(!f.deliverables||f.deliverables.length===0)&&f.status!=="HỦY");r.length&&e.push({type:"⚠️",msg:`${r.length} job thiếu lộ trình/thành phẩm`,items:r.map(f=>f.client||f.id)});const o=n.filter(f=>(!f.services||f.services.length===0)&&f.status!=="HỦY");o.length&&e.push({type:"👤",msg:`${o.length} job chưa gán nhân sự chụp/quay`,items:o.map(f=>f.client||f.id)});const s=n.filter(f=>!f.date||isNaN(new Date(f.date).getTime()));s.length&&e.push({type:"📅",msg:`${s.length} job sai định dạng ngày`,items:s.map(f=>f.client||f.id)});const a=n.filter(f=>!f.jobNo&&f.status!=="HỦY");a.length&&e.push({type:"🏷️",msg:`${a.length} job thiếu mã Hợp đồng (Job No)`,items:a.map(f=>f.client||f.id)});const l={},d=[];if(n.forEach(f=>{f.jobNo&&f.status!=="HỦY"&&(l[f.jobNo]?d.push(f.jobNo):l[f.jobNo]=!0)}),d.length){const f=n.filter(u=>d.includes(u.jobNo));e.push({type:"🚨",msg:`${d.length} mã Hợp đồng bị trùng lặp`,items:f.map(u=>`${u.jobNo} (${u.client||u.id})`)})}const p=n.filter(f=>f.package!==void 0&&f.package!==""&&(isNaN(parseInt(f.package))||parseInt(f.package)<0));if(p.length&&e.push({type:"💰",msg:`${p.length} job có doanh thu không hợp lệ (< 0)`,items:p.map(f=>f.client||f.id)}),t)return e;const c=document.getElementById("debug-health-result");c&&(e.length===0?c.innerHTML='<div style="color:#22c55e;font-weight:800;padding:0.5rem">✅ Hệ thống khỏe mạnh! Không phát hiện vấn đề.</div>':c.innerHTML=e.map(f=>`
        <div style="margin-bottom:0.5rem;padding:0.5rem;background:rgba(255,200,0,0.1);border-radius:6px;border-left:3px solid #f59e0b">
          <div style="font-weight:800;font-size:0.85rem">${f.type} ${f.msg}</div>
          <div style="font-size:0.72rem;color:var(--text-dim);margin-top:0.2rem">${f.items.slice(0,5).join(", ")}${f.items.length>5?"...":""}</div>
        </div>
      `).join(""))};window.showDebugLogs=()=>{const t=document.getElementById("debug-console-result");if(t){const e=(window._debugLogs||[]).slice(-30).reverse();if(e.length===0)t.innerHTML='<div style="color:var(--text-dim);padding:0.5rem;font-size:0.8rem">Chưa có log nào.</div>';else{const n={log:"#888",warn:"#f59e0b",error:"#ef4444"};t.innerHTML=e.map(i=>`<div style="font-family:monospace;font-size:0.7rem;padding:0.2rem 0.4rem;border-bottom:1px solid rgba(0,0,0,0.05);color:${n[i.level]||"#888"}"><span style="opacity:0.5">[${i.time}]</span> ${i.msg}</div>`).join("")}}};window.forceMigration=()=>{if(!confirm("Chạy lại migration thành phẩm cho TẤT CẢ job chưa có deliverables?"))return;let t=0;m.jobs.forEach(e=>{if(!e.deliverables||e.deliverables.length===0){const n=[],i=(e.services||[]).filter(o=>(o.service||"").toLowerCase().includes("quay")).length;i===1?n.push({name:"Clip Phóng sự",type:"Video",quantity:1,editStatus:"Chưa bắt đầu"}):i>=2&&(n.push({name:"Clip Phóng sự",type:"Video",quantity:1,editStatus:"Chưa bắt đầu"}),n.push({name:"Clip Truyền thống",type:"Video",quantity:1,editStatus:"Chưa bắt đầu"}));const r=(e.services||[]).filter(o=>(o.service||"").toLowerCase().includes("chụp")).length;for(let o=0;o<r;o++)n.push({name:r===1?"Bộ Hình":`Bộ Hình ${o+1}`,type:"Photo",quantity:1,editStatus:"Chưa bắt đầu"});if(n.length>0){const o=(e.services||[]).find(a=>(a.service||"").toLowerCase().includes("quay"));o&&n.filter(a=>a.type==="Video").forEach(a=>{a.editor=o.editStaff||"",a.editStatus=o.editStatus||"Chưa bắt đầu",a.editDriveLink=o.editDriveLink||""});const s=(e.services||[]).find(a=>(a.service||"").toLowerCase().includes("chụp"));s&&n.filter(a=>a.type==="Photo").forEach(a=>{a.editor=s.editStaff||"",a.editStatus=s.editStatus||"Chưa bắt đầu",a.editDriveLink=s.editDriveLink||""}),e.deliverables=n,t++}}}),m.jobs.forEach(e=>{(e.deliverables||[]).forEach(n=>{n.name==="Ảnh Tiệc"&&(n.name="Ảnh Phóng sự")})}),N(),S(),alert(`✅ Migration hoàn tất!
${t} job đã được tạo thành phẩm.`)};window.saveFirebaseConfig=()=>{const t=document.getElementById("setting-firebase-config");if(!t)return;const e=t.value.trim();if(!e){m.settings.firebaseConfig="",m.settings.enableFirebaseSync=!1,N(),alert("Đã xóa cấu hình Firebase. Ứng dụng về chế độ Offline.");return}try{if(JSON.parse(e),m.settings.firebaseConfig=e,m.settings.enableFirebaseSync=!0,!$t(e)){alert("Lỗi: Không thể kết nối Firebase với Config này.");return}N(),alert("Đã lưu cấu hình Đám Mây! Vui lòng tải lại trang (F5) để kết nối Database.")}catch{alert("Lỗi: Cấu hình JSON không hợp lệ. Vui lòng kiểm tra lại!")}};window.saveSmartIntegrations=()=>{m.settings.zaloEnable=document.getElementById("setting-zalo-enable").checked,m.settings.zaloToken=document.getElementById("setting-zalo-token").value.trim(),m.settings.zaloTemplateId=document.getElementById("setting-zalo-template").value.trim(),m.settings.teleEnable=document.getElementById("setting-tele-enable").checked,m.settings.teleBotToken=document.getElementById("setting-tele-bot").value.trim(),m.settings.teleChatId=document.getElementById("setting-tele-chatid").value.trim(),m.settings.driveEnable=document.getElementById("setting-drive-enable").checked,m.settings.driveParentId=document.getElementById("setting-drive-parent").value.trim(),m.settings.driveClientSecret=document.getElementById("setting-drive-client").value.trim(),N(),alert("✅ Đã lưu cấu hình Hệ Sinh Thái Tự Động (Smart Integrations)"),S()};window.forceSyncAllDataToCloud=async()=>{if(!m.settings.enableFirebaseSync||!m.settings.firebaseConfig){alert("Vui lòng Cài đặt và Lưu Cấu hình Firebase trước.");return}if(!$t(m.settings.firebaseConfig)){alert("Lỗi kết nối Firebase");return}window.showFloatingSaveStatus("saving");try{await We(m),window.showFloatingSaveStatus("saved"),alert("✅ Đã đẩy toàn bộ dữ liệu từ máy tính này lên Cloud thành công!")}catch(e){console.error(e),window.showFloatingSaveStatus("error"),alert("❌ Có lỗi xảy ra khi đẩy dữ liệu: "+e.message)}};window.migrateLocalPortfolioToFirebase=async()=>{try{const t=Array.isArray(m.portfolios)?m.portfolios:[],e=[],n=["haru_state_v1","haru_state_v2","haru_app_state_v2"];for(const l of n)try{const d=localStorage.getItem(l);if(!d)continue;const p=JSON.parse(d);Array.isArray(p?.portfolios)&&e.push(...p.portfolios)}catch{}const i=[...t,...e].filter(Boolean),r=new Map;for(const l of i){const d=String(l.id||l.slug||l.title||Math.random());r.has(d)||r.set(d,l)}const o=Array.from(r.values());if(!o.length){alert("Không tìm thấy portfolio local để migrate.");return}let s=m.settings.firebaseConfig;if(!s){const l=(()=>{try{return`{
  "apiKey": "AIzaSyCzyL0JG6gnSmmaSpUnCfMQJOiiNijQ4Gk",
  "authDomain": "haru-studio-6917a.firebaseapp.com",
  "databaseURL": "https://haru-studio-6917a-default-rtdb.firebaseio.com",
  "projectId": "haru-studio-6917a",
  "storageBucket": "haru-studio-6917a.firebasestorage.app",
  "messagingSenderId": "812528617751",
  "appId": "1:812528617751:web:656531dd61280113088f52",
  "measurementId": "G-S48GCMV34D"
}`}catch{return null}})(),d=window.HARU_PUBLIC_FIREBASE_CONFIG||window.HARU_FIREBASE_CONFIG||null;s=l||(d?JSON.stringify(d):"")}if(!s){alert("Thiếu Firebase Config. Vào Cài đặt dán config trước khi migrate.");return}if(!$t(s)){alert("Không thể kết nối Firebase. Kiểm tra lại cấu hình.");return}m.settings.firebaseConfig=typeof s=="string"?s:JSON.stringify(s),m.settings.enableFirebaseSync=!0,m.portfolios=o,await We(m),N(),alert(`✅ Đã migrate ${o.length} portfolio lên Firebase.`)}catch(t){console.error("migrateLocalPortfolioToFirebase error:",t),alert("Migrate thất bại. Xem console để biết chi tiết.")}};window.reconcilePortfolioNow=async()=>{try{let t=m.settings.firebaseConfig;if(!t){const l=(()=>{try{return`{
  "apiKey": "AIzaSyCzyL0JG6gnSmmaSpUnCfMQJOiiNijQ4Gk",
  "authDomain": "haru-studio-6917a.firebaseapp.com",
  "databaseURL": "https://haru-studio-6917a-default-rtdb.firebaseio.com",
  "projectId": "haru-studio-6917a",
  "storageBucket": "haru-studio-6917a.firebasestorage.app",
  "messagingSenderId": "812528617751",
  "appId": "1:812528617751:web:656531dd61280113088f52",
  "measurementId": "G-S48GCMV34D"
}`}catch{return null}})(),d=window.HARU_PUBLIC_FIREBASE_CONFIG||window.HARU_FIREBASE_CONFIG||null;t=l||(d?JSON.stringify(d):"")}if(!t){alert("Thiếu Firebase Config để reconcile.");return}if(!$t(t)){alert("Không thể kết nối Firebase.");return}const n=await mr(),i=Array.isArray(n?.portfolios)?n.portfolios:[],r=Array.isArray(m.portfolios)?m.portfolios:[],o=new Map,s=l=>{if(!l)return;const d=l.id||`PF-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,p=o.get(d);if(!p)o.set(d,{...l,id:d});else{const c=(p.thumbnail?1:0)+((p.images||[]).length>0?1:0),f=(l.thumbnail?1:0)+((l.images||[]).length>0?1:0);o.set(d,f>=c?{...p,...l,id:d}:{...l,...p,id:d})}};i.forEach(s),r.forEach(s);const a=Array.from(o.values());m.portfolios=a,m.settings.enableFirebaseSync=!0,m.settings.firebaseConfig=typeof t=="string"?t:JSON.stringify(t),await We(m),N(),S(),alert(`✅ Reconcile xong. Local: ${r.length} | Remote: ${i.length} | Sau gộp: ${a.length}`)}catch(t){console.error("reconcilePortfolioNow error:",t),alert("Reconcile thất bại. Xem console để biết chi tiết.")}};const gr="haru_session";(function(){try{const e=localStorage.getItem(gr);if(e){const n=JSON.parse(e);n&&n.username&&n.role&&(m.currentUser=n)}}catch{}})();window.login=(t,e)=>{let i=[{username:"ADMIN",password:"2808",role:"admin",displayName:"Admin"},{username:"EDIT",password:"EDIT",role:"editor",displayName:"Editor"}].find(r=>r.username.toLowerCase()===t.toLowerCase()&&r.password===e);if(!i){const r=m.staff.find(o=>o.name.toLowerCase()===t.toLowerCase());if(r){const o=r.phone||"1234";if(e===o||e==="1234"){const s=(r.role||"").toLowerCase(),a=s.includes("edit"),l=s.includes("ctv");let d="staff";a?d="editor":l&&(d="ctv"),i={username:r.name,password:o,role:d,displayName:r.name,staffName:r.name}}}}return i?(m.currentUser={username:i.username,role:i.role,displayName:i.displayName,staffName:i.staffName||null},localStorage.setItem(gr,JSON.stringify(m.currentUser)),["editor","staff","ctv"].includes(i.role)?m.activePage="workspace":m.activePage="dashboard",window.addHistory(`Đăng nhập: ${i.displayName} (${i.role})`),S(),!0):!1};window.logout=()=>{window.addHistory(`Đăng xuất: ${m.currentUser?.displayName||"Unknown"}`),m.currentUser=null,localStorage.removeItem(gr),S()};window.state=m;window.saveState=N;window.lockJob=Ta;window.unlockJob=Ca;window.watchLocks=Sa;window.trackUserPresence=$a;window.watchPresence=Ea;function lm(){return Math.random().toString(36).substr(2,4).toUpperCase()+"-"+Date.now().toString(36).substr(-4).toUpperCase()}function dm(t,e){m.currentMonth=t,m.currentYear=e,S()}let Ni=!1;function S(){Ni||(Ni=!0,requestAnimationFrame(cm))}window.updateUI=S;function cm(){Ni=!1,J.innerHTML="";const t=new URLSearchParams(window.location.search),e=t.get("gallery"),n=t.get("hub");if(e||n==="haru"){document.body.style.overflowY="auto",J.style.display="block",J.style.gridTemplateColumns="none",document.title=e?"Haru Gallery - Khám phá Album":"Haru Studio - Portfolio Hub",document.body.style.background="#0a0a0a";const p=document.createElement("div");p.id="gallery-root",J.appendChild(p);const c=()=>{p.innerHTML="";const f=li(e||"home",window.state);p.appendChild(f)};if(setTimeout(c,500),setTimeout(async()=>{if(!(Array.isArray(m.portfolios)&&m.portfolios.filter(f=>f.isVisible).length>0))try{const f=window.HARU_PUBLIC_FIREBASE_CONFIG;if(!f||!f.databaseURL)return;const u=f.databaseURL.replace(/\/$/,""),h=await fetch(`${u}/haru_state/portfolios.json`);if(!h.ok)return;const v=await h.json();Array.isArray(v)&&v.length>0&&(console.log("🌐 [REST Fallback] Lấy được",v.length,"portfolios từ RTDB REST"),m.portfolios=v,c())}catch(f){console.warn("[REST Fallback] Lỗi fetch portfolios:",f.message)}},1500),!e){let f=null;Na(u=>{clearTimeout(f),f=setTimeout(()=>{if(Array.isArray(u)&&JSON.stringify(u)!==JSON.stringify(m.portfolios)){m.portfolios=u;const v=document.getElementById("gallery-root");v&&(v.innerHTML="",v.appendChild(li("home",window.state)))}},300)})}return}if(!m.currentUser){J.style.display="flex",J.style.gridTemplateColumns="none";const p=Ho();J.appendChild(p);return}if(m.currentUser.role==="staff"){document.body.style.overflowY="auto",J.style.display="block",J.style.gridTemplateColumns="none";const p=Oo(m);J.appendChild(p);return}if(m.currentUser.role==="editor"){document.body.style.overflowY="auto",J.style.display="block",J.style.gridTemplateColumns="none";const p=m.currentMonth,c=m.currentYear,f=new Date(c,p-2,1),u=f.getMonth()+1,h=f.getFullYear(),v=m.jobs.filter(b=>{const y=new Date(b.date),x=y.getMonth()+1,T=y.getFullYear();return x===p&&T===c||x===u&&T===h}),g={...m,jobs:v,prevMonth:u,prevYear:h},_=Ro(g);J.appendChild(_);return}const i=window.innerWidth<=900;document.body.style.overflowY=i?"auto":"hidden",i?(J.style.display="block",J.style.gridTemplateColumns="none"):(J.style.display="grid",J.style.gridTemplateColumns="270px 1fr");const r=vo(m.activePage);J.appendChild(r);const o=yo(m.activePage);J.appendChild(o);const s=document.createElement("main");if(s.className="main-content",m.activePage!=="settings"&&m.activePage!=="staff"&&m.activePage!=="portfolio"){const p=document.createElement("div");p.className="view-header",p.appendChild(bo(m,dm)),s.appendChild(p)}const a=m.jobs.filter(p=>{const c=new Date(p.date),f=c.getMonth()+1,u=c.getFullYear();return!!(f===m.currentMonth&&u===m.currentYear||m.extraMonth&&f===m.extraMonth.month&&u===m.extraMonth.year)}),l={...m,jobs:a};switch(m.activePage){case"workspace":s.appendChild(wo(l));break;case"dashboard":s.appendChild(ai(l));break;case"jobs":s.appendChild(_o(l));break;case"clients":s.appendChild(Mo(m));break;case"staff":s.appendChild(zo(m));break;case"finance":s.appendChild(ko(l));break;case"tax":s.appendChild(To(l));break;case"edit":s.appendChild($o(l));break;case"edit_video":s.appendChild(Eo(l));break;case"edit_photo":s.appendChild(Fo(l));break;case"calendar":s.appendChild(Co(m));break;case"trash":s.appendChild(So(m));break;case"portfolio":s.appendChild(jo(m));break;case"settings":s.appendChild(No(m));break;case"sync":s.appendChild(Po(m));break;case"nas":s.appendChild(Ao());break;case"kanban":s.appendChild(Io(m));break;case"analytics":s.appendChild(Do(m));break;case"year-report":s.appendChild(Vo(m));break;case"history":s.appendChild(Lo(m));break;case"gear":s.appendChild(Uo(m));break;default:s.appendChild(ai(l))}if(J.appendChild(s),i&&m.activePage!=="settings"&&m.activePage!=="portfolio"&&m.currentUser?.role!=="editor"){const p=document.createElement("div");p.className="fab-container";const c=document.createElement("button");c.className="fab-main",c.innerHTML='<i class="fas fa-plus"></i>';const f=document.createElement("div");f.className="fab-menu",f.innerHTML=`

      <div class="fab-item" onclick="window.openModal()">
        <span class="fab-label">Tạo Hợp đồng (Job)</span>
        <button class="fab-btn"><i class="fas fa-file-signature"></i></button>
      </div>
    `,c.onclick=()=>{c.classList.toggle("active"),f.classList.toggle("active")},p.appendChild(f),p.appendChild(c),J.appendChild(p)}if(i){const p=s.querySelector(".view-header");if(p){p.classList.add("sticky-header-mobile");let v=0;s.addEventListener("scroll",()=>{const g=s.scrollTop;g>v&&g>80?p.classList.add("sticky-header-hidden"):p.classList.remove("sticky-header-hidden"),v=g},{passive:!0})}let c=0,f=0,u=!1,h=null;s.addEventListener("touchstart",v=>{s.scrollTop<=5&&(c=v.touches[0].clientY,u=!0)},{passive:!0}),s.addEventListener("touchmove",v=>{if(!u)return;f=v.touches[0].clientY;const g=f-c;if(g>10&&s.scrollTop<=0){h||(h=document.createElement("div"),h.innerHTML='<i class="fas fa-sync-alt" style="color:var(--primary); font-size:1.5rem"></i>',h.style.cssText="position:absolute; top:-50px; left:50%; transform:translateX(-50%); z-index:99; display:flex; align-items:center; justify-content:center; width:40px; height:40px; background:var(--bg-card); border-radius:50%; box-shadow:0 4px 12px rgba(0,0,0,0.1); transition: top 0.1s linear",s.style.position="relative",s.appendChild(h));const _=Math.min(g*.4,80);h.style.top=`${_-40}px`,_>=60&&(h.querySelector("i").style.transform=`rotate(${g}deg)`)}},{passive:!1}),s.addEventListener("touchend",()=>{if(!u||!h){u=!1;return}const v=f-c;u=!1,v>150?(h.style.transition="top 0.3s ease",h.style.top="10px",h.querySelector("i").classList.add("fa-spin"),window.navigator&&window.navigator.vibrate&&window.navigator.vibrate(50),setTimeout(()=>{window.location.reload()},500)):(h.style.transition="top 0.3s ease",h.style.top="-50px",setTimeout(()=>{h&&h.remove(),h=null},300))})}i&&(document.querySelectorAll('input[type="number"]').forEach(p=>{p.hasAttribute("inputmode")||(p.setAttribute("inputmode","numeric"),p.setAttribute("pattern","[0-9]*"))}),document.querySelectorAll("input, select, textarea").forEach(p=>{const c=window.getComputedStyle(p),f=parseFloat(c.fontSize);f&&f<16&&(p.style.fontSize="16px")}));const d=(p,c)=>{if(!p||!c||p===c)return;const f=u=>{let h=u.previousElementSibling;if((!h||!h.textContent.includes("("))&&(h=u.parentElement?.querySelector('div[style*="font-weight:800"]')),h&&h.textContent.match(/\((\d+)\)/)){const g=Array.from(u.children).filter(_=>!_.classList.contains("sortable-ghost")&&!_.classList.contains("kanban-ghost")).length;h.textContent=h.textContent.replace(/\(\d+\)/,`(${g})`)}};f(p),f(c)};if(requestAnimationFrame(()=>{setTimeout(()=>{typeof Sortable>"u"||(document.querySelectorAll(".kanban-list").forEach(p=>{p._sortableInstance&&p._sortableInstance.destroy(),p._sortableInstance=new Sortable(p,{group:"kanban",animation:150,ghostClass:"kanban-ghost",filter:".locked-card",preventOnFilter:!0,onEnd:c=>{const f=c.item,u=c.to.dataset.status;window.updateVideoEditStatus&&(window.updateVideoEditStatus(f.dataset.jobId,f.dataset.svc,u,!0),d(c.from,c.to))}})}),document.querySelectorAll(".ev-col-cards").forEach(p=>{p._sortableInstance&&p._sortableInstance.destroy(),p._sortableInstance=new Sortable(p,{group:"editVideoKanban",animation:200,ghostClass:"sortable-ghost",filter:".locked-card",preventOnFilter:!0,onEnd:c=>{const f=c.item,u=c.to.dataset.status,h=f.dataset.jobid,v=parseInt(f.dataset.sidx),g=m.jobs.find(_=>_.id===h);g&&g.services[v]&&(window.updateVideoEditStatus&&window.updateVideoEditStatus(h,g.services[v].service,u,!0),d(c.from,c.to))}})}),document.querySelectorAll(".ep-col-cards").forEach(p=>{p._sortableInstance&&p._sortableInstance.destroy(),p._sortableInstance=new Sortable(p,{group:"editPhoto",animation:200,ghostClass:"sortable-ghost",filter:".locked-card",preventOnFilter:!0,onEnd:c=>{const f=c.item,u=c.to.closest(".ep-col").dataset.status,h=f.dataset.jobid,v=f.dataset.svcname;window.updateEditStatus&&(window.updateEditStatus(h,v,u,!0),d(c.from.closest(".ep-col"),c.to.closest(".ep-col")))}})}),document.querySelectorAll(".ep-kanban-list").forEach(p=>{p._sortableInstance&&p._sortableInstance.destroy(),p._sortableInstance=new Sortable(p,{group:"editor-kanban",animation:150,ghostClass:"kanban-ghost",dragClass:"kanban-drag",filter:".locked-card",preventOnFilter:!0,onEnd:c=>{const f=c.item,u=c.to.dataset.status,h=f.dataset.jobid,v=f.dataset.sidx;window.updateVideoEditStatus&&(window.updateVideoEditStatus(h,v,u,!0),d(c.from,c.to))}})}),document.querySelectorAll(".leads-list").forEach(p=>{p._sortableInstance&&p._sortableInstance.destroy(),p._sortableInstance=new Sortable(p,{group:"leads-kanban",animation:150,ghostClass:"kanban-ghost",onEnd:c=>{const f=c.item,u=c.to.dataset.status,h=f.dataset.id,v=m.leads.find(g=>g.id===h);v&&v.status!==u&&(v.status=u,v.updated=new Date().toISOString(),N(),S())}})}))},100)}),m.modal.isOpen){const p=xo(m,window.closeModal);J.appendChild(p)}if(m.currentUser?.role==="admin"){if(!document.getElementById("emergency-sync-btn")){const c=document.createElement("button");c.id="emergency-sync-btn",c.title="Đồng bộ khẩn cấp — đẩy data lên tất cả thiết bị ngay lập tức",c.onclick=()=>window.emergencySync(),c.style.cssText=["position: fixed","bottom: 5.5rem","right: 1.25rem","z-index: 99999","width: 48px","height: 48px","border-radius: 50%","border: none","background: linear-gradient(135deg, #ef4444, #dc2626)","color: #fff","font-size: 1.2rem","cursor: pointer","box-shadow: 0 4px 16px rgba(239,68,68,0.45)","display: flex","align-items: center","justify-content: center","transition: transform 0.2s, box-shadow 0.2s"].join(";"),c.innerHTML="🚨",c.onmouseenter=()=>{c.style.transform="scale(1.1)",c.style.boxShadow="0 6px 24px rgba(239,68,68,0.6)"},c.onmouseleave=()=>{c.style.transform="",c.style.boxShadow="0 4px 16px rgba(239,68,68,0.45)"},document.body.appendChild(c)}}else{const p=document.getElementById("emergency-sync-btn");p&&p.remove()}}window.exportInvoiceToPDF=t=>{const e=m.jobs.find(f=>f.id===t);if(!e)return;const n=e.package||0,i=e.deposit||0,r=n-i,o=new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}),s=f=>o.format(f),a=(e.services||[]).map(f=>`<li>${f.service}</li>`).join(""),l=document.createElement("div");if(l.innerHTML=`
    <style>
      .pdf-wrapper { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; line-height: 1.5; padding: 2rem; max-width: 800px; margin: 0 auto; background: #fff; }
      .pdf-wrapper .header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #16a34a; padding-bottom: 1rem; margin-bottom: 2rem; }
      .pdf-wrapper .brand h1 { margin: 0; color: #16a34a; font-size: 2.5rem; letter-spacing: -1px; }
      .pdf-wrapper .brand p { margin: 0; color: #666; font-size: 0.9rem; }
      .pdf-wrapper .invoice-meta { text-align: right; }
      .pdf-wrapper .invoice-meta div { margin-bottom: 0.3rem; }
      .pdf-wrapper .bill-to h3 { margin: 0 0 0.5rem 0; color: #16a34a; font-size: 1.1rem; text-transform: uppercase; }
      .pdf-wrapper .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: #f8fafc; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; }
      .pdf-wrapper table { width: 100%; border-collapse: collapse; margin-bottom: 2rem; }
      .pdf-wrapper th { background: #16a34a; color: white; padding: 0.75rem; text-align: left; font-weight: 600; }
      .pdf-wrapper td { padding: 0.75rem; border-bottom: 1px solid #e2e8f0; }
      .pdf-wrapper .text-right { text-align: right; }
      .pdf-wrapper .summary { border-top: 2px solid #e2e8f0; padding-top: 1rem; width: 60%; float: right; }
      .pdf-wrapper .summary-row { display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 1.1rem; }
      .pdf-wrapper .summary-row.total { font-size: 1.3rem; font-weight: bold; color: #16a34a; margin-top: 0.5rem; border-top: 1px solid #e2e8f0; padding-top: 0.5rem; }
      .pdf-wrapper .summary-row.rem { font-size: 1.3rem; font-weight: bold; color: #ea580c; }
      .pdf-wrapper .footer { margin-top: 4rem; text-align: center; color: #666; font-size: 0.85rem; border-top: 1px solid #e2e8f0; padding-top: 1rem; clear: both; }
    </style>
    <div class="pdf-wrapper">
      <div class="header">
        <div class="brand">
          <h1>HARU STUDIO</h1>
          <p>Dịch vụ Quay/Chụp Sự kiện & Ngày Cưới</p>
        </div>
        <div class="invoice-meta">
          <div style="font-size: 1.5rem; font-weight: bold; color: #333; margin-bottom: 0.5rem">HÓA ĐƠN DỊCH VỤ</div>
          <div><strong>Mã Hóa Đơn:</strong> #${e.jobNo||e.id.split("-")[1]||"0000"}</div>
          <div><strong>Ngày lập:</strong> ${new Date().toLocaleDateString("vi-VN")}</div>
        </div>
      </div>

      <div class="info-grid">
        <div>
          <h3>Khách Hàng</h3>
          <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 0.2rem">${e.client}</div>
          <div><strong>SĐT:</strong> ${e.phone||"Chưa cung cấp"}</div>
        </div>
        <div>
          <h3>Thông Tin Sự Kiện</h3>
          <div><strong>Ngày tổ chức:</strong> ${new Date(e.date).toLocaleDateString("vi-VN")}</div>
          <div><strong>Loại hình:</strong> ${e.eventType||"Wedding"}</div>
          <div><strong>Địa điểm:</strong> ${e.venue||"Chưa cập nhật"}</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Chi Tiết Dịch Vụ</th>
            <th class="text-right">Phí Dịch Vụ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div style="font-weight: bold; margin-bottom: 0.5rem">Gói Quay/Chụp Tổng Hợp</div>
              <ul style="margin: 0; padding-left: 1.2rem; color: #555">
                ${a}
              </ul>
            </td>
            <td class="text-right" style="vertical-align: top; font-weight: bold">Trọn gói</td>
          </tr>
        </tbody>
      </table>

      <div class="summary">
        <div class="summary-row">
          <span>Tổng Giá Trị Gói:</span>
          <span>${s(n)}</span>
        </div>
        <div class="summary-row">
          <span>Đã Đặt Cọc:</span>
          <span>${s(i)}</span>
        </div>
        <div class="summary-row rem">
          <span>Còn Lại Cần Thanh Toán:</span>
          <span>${s(r)}</span>
        </div>
      </div>

      <div class="footer">
        <p>Cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ của Haru Studio!</p>
        <p>Mọi thắc mắc vui lòng liên hệ hotline hoặc inbox trực tiếp qua Fanpage.</p>
      </div>
    </div>
  `,typeof html2pdf>"u"){alert("Thư viện xuất PDF đang được tải, vui lòng thử lại sau vài giây.");return}const d=document.activeElement,p=d?d.innerHTML:"";d&&d.tagName==="BUTTON"&&(d.innerHTML='<i class="fas fa-spinner fa-spin"></i> Đang xuất...',d.disabled=!0);const c={margin:10,filename:`HoaDon_${e.client.replace(/[^a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]/g,"_")}_${e.jobNo||e.id.split("-")[1]}.pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2,useCORS:!0},jsPDF:{unit:"mm",format:"a4",orientation:"portrait"}};html2pdf().set(c).from(l).save().then(()=>{d&&d.tagName==="BUTTON"&&(d.innerHTML=p,d.disabled=!1)}).catch(f=>{console.error("Lỗi xuất PDF:",f),alert("Có lỗi xảy ra khi xuất PDF. Vui lòng thử lại."),d&&d.tagName==="BUTTON"&&(d.innerHTML=p,d.disabled=!1)})};window._promptEditLink=(t,e)=>{const n=`edit-job-link-${t}`,i=document.getElementById(n);if(!i)return;const r=i.value,o=prompt(`Nhập ${e}:`,r);if(o!==null&&(i.value=o,m.modal.type==="job_detail"&&m.modal.data&&m.modal.data.id)){const s=m.jobs.find(a=>a.id===m.modal.data.id);s&&(t==="customer"&&(s.linkCustomer=o),t==="nas"&&(s.linkNAS=o),t==="drive"&&(s.linkDrive=o),S())}};window.addClientPrompt=()=>{const t=prompt("Tên khách hàng:");if(!t)return;const e=prompt("Số điện thoại (Tuỳ chọn):")||"",n={id:"CUST-"+Math.random().toString(36).substr(2,6).toUpperCase(),name:t,phone:e,jobs:[]};m.clients=m.clients||[],m.clients.push(n),window.addHistory("Thêm khách hàng mới: "+t),N(),S()};window.editClientPrompt=t=>{const e=m.clients.find(r=>r.id===t);if(!e)return;const n=prompt("Tên khách hàng mới:",e.name);if(!n)return;const i=prompt("SĐT mới:",e.phone||"");n!==e.name&&confirm("Cập nhật tên khách hàng này trong tất cả dự án liên quan?")&&m.jobs.forEach(r=>{r.client===e.name&&(r.client=n)}),e.name=n,e.phone=i||"",window.addHistory("Sửa khách hàng: "+n),N(),S()};window.removeClient=t=>{m.clients=m.clients.filter(e=>e.id!==t),window.addHistory("Xóa khách hàng ID: "+t),N(),S()};window.saveCategories=()=>{const t=document.getElementById("setting-event-categories"),e=document.getElementById("setting-service-roles");if(t&&e){const n=t.value.split(",").map(r=>r.trim()).filter(Boolean),i=e.value.split(",").map(r=>r.trim()).filter(Boolean);m.settings.eventCategories=n,m.settings.serviceRoles=i,window.addHistory("Cập nhật Danh mục & Vai trò"),N(),window.sendNotification("Thành công","Đã lưu cấu hình danh mục sự kiện và nhân sự!","✅"),S()}};window.importGoLiveData=async()=>{if(confirm(`BẠN CÓ CHẮC CHẮN MUỐN NẠP DỮ LIỆU GO-LIVE?

Hành động này sẽ tải 13 Dự án thật từ Google Sheets.

Đặc biệt: Hệ thống tự động PHỤC HỒI Dữ liệu Tháng 1 và Tháng 2 mặc định của bạn.`))try{const e=await(await fetch("/new_state.json?t="+Date.now())).json(),n=pe.jobs.filter(i=>{if(!i.date)return!1;const r=new Date(i.date).getMonth()+1;return r===1||r===2});m.jobs=[...n,...e.jobs||[]],m.clients=e.clients||[],m.history=[{time:new Date().toISOString(),action:"Khởi tạo hệ thống Go-Live (Đã phục hồi T1, T2)",user:"Admin"}],m.financeMetadata={},m.manualTransactions=[],N(),S(),alert(`🎉 NẠP DỮ LIỆU THÀNH CÔNG!

13 Dự án mới đã được nạp. Toàn bộ dữ liệu Tháng 1 & 2 đã được phục hồi nguyên vẹn.`)}catch(t){console.error(t),alert("Lỗi khi nạp dữ liệu: "+t.message)}};window._openPortfolioModal=(t=null,e=null)=>{let n={id:"PF-"+Date.now(),jobName:e?.description||"",category:"Sự kiện",description:e?.url?`Tự động nhập từ: ${e.url}`:"",date:new Date().toISOString().split("T")[0],thumbnail:e?.images?.[0]||"",videoLink:"",images:e?.images||[],isVisible:!0};if(t){const r=m.portfolios?.find(o=>o.id===t);r&&(n=JSON.parse(JSON.stringify(r)))}const i=document.createElement("div");i.className="modal-overlay portfolio-modal",i.innerHTML=`
    <div class="modal" style="width: 95%; max-width: 900px; max-height: 90vh; overflow-y: auto; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
      <div class="modal-header" style="border-bottom: 1px solid var(--border); padding-bottom: 1rem; margin-bottom: 1.5rem;">
         <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-main); margin: 0;">${t?"Chỉnh sửa Portfolio":"Tạo Portfolio mới"}</h3>
         <button onclick="this.closest('.modal-overlay').remove()" style="background: var(--bg-body); border: 1px solid var(--border); border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-dim); transition: all 0.2s;">
            <i class="fas fa-times"></i>
         </button>
      </div>
      <div class="modal-body" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem">
         
         <!-- CỘT TRÁI: THÔNG TIN CƠ BẢN -->
         <div style="display:flex; flex-direction:column; gap:1.25rem">
            <div class="form-group">
               <label style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Tên Bộ sưu tập (Tên KH / Sự kiện) <span style="color: var(--danger)">*</span></label>
               <input type="text" id="pf-name" class="form-control" value="${n.jobName}" placeholder="VD: Đám cưới Duy & Trinh" style="border-radius: 8px; padding: 0.75rem; border: 1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem">
              <div class="form-group">
                 <label style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Phân loại <span style="color: var(--danger)">*</span></label>
                 <select id="pf-category" class="form-control" style="border-radius: 8px; padding: 0.75rem; border: 1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                    ${(m.settings?.eventCategories||["Pre-wedding","Phóng sự","Sự kiện","Khác"]).map(r=>`
                       <option value="${r}" ${n.category===r?"selected":""}>${r}</option>
                    `).join("")}
                 </select>
              </div>
              <div class="form-group">
                 <label style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Ngày thực hiện</label>
                 <input type="date" id="pf-date" class="form-control" value="${n.date?n.date.split("T")[0]:""}" style="border-radius: 8px; padding: 0.75rem; border: 1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
              </div>
            </div>

            <div class="form-group">
               <label style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Ảnh Bìa (Thumbnail HTML) <span style="color: var(--danger)">*</span></label>
               <div style="display:flex; gap:0.5rem; align-items:center;">
                 <input type="url" id="pf-thumbnail" class="form-control" value="${n.thumbnail}" placeholder="https://domain.com/anh-bia.jpg" style="flex:1; border-radius: 8px; padding: 0.75rem; border: 1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                 <label for="pf-thumb-upload" class="btn" style="cursor:pointer; padding: 0.75rem 1rem; white-space:nowrap; border:1px solid var(--border); background:var(--bg-body); border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: background 0.2s;">
                    <i class="fas fa-image" style="color: var(--primary); margin-right: 0.4rem;"></i> Tải ảnh
                 </label>
                 <input type="file" id="pf-thumb-upload" accept="image/*" style="display:none" onchange="window._handleThumbnailUpload(event)">
               </div>
               
               <div id="pf-thumb-preview" style="display:${n.thumbnail?"block":"none"}; width:100%; height:160px; border-radius:12px; background:url('${n.thumbnail}') center/cover; border:1px solid var(--border); margin-top:0.75rem; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);"></div>
               <div id="pf-thumb-status" style="font-size:0.85rem; font-weight:600; color:var(--primary); display:none; margin-top:0.5rem; display:flex; align-items:center; gap:0.4rem;"><i class="fas fa-spinner fa-spin"></i> Đang tải lên...</div>
               <div style="font-size:0.8rem; color:var(--text-dim); margin-top:0.5rem"><i class="fas fa-info-circle"></i> Khuyên dùng ảnh ngang 16:9 chất lượng cao.</div>
            </div>

            <div class="form-group">
               <label style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Link Video Youtube / Vimeo (Tùy chọn)</label>
               <input type="url" id="pf-video" class="form-control" value="${n.videoLink||""}" placeholder="https://youtube.com/watch?v=..." style="border-radius: 8px; padding: 0.75rem; border: 1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            </div>
            
            <div class="form-group">
               <label style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Mô tả / Lời dẫn (Tùy chọn)</label>
               <textarea id="pf-desc" class="form-control" rows="3" placeholder="Vài dòng cảm nghĩ về bộ ảnh..." style="border-radius: 8px; padding: 0.75rem; border: 1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.05); resize: vertical;">${n.description||""}</textarea>
            </div>
            
            <div class="form-group" style="display:flex; align-items:center; gap:0.75rem; margin-top: 0.5rem; background: var(--bg-body); padding: 1rem; border-radius: 12px; border: 1px solid var(--primary); box-shadow: 0 2px 5px rgba(22, 163, 74, 0.1);">
               <input type="checkbox" id="pf-visible" ${n.isVisible?"checked":""} style="width: 20px; height: 20px; accent-color: var(--primary); cursor: pointer;">
               <div>
                 <label for="pf-visible" style="margin:0; font-weight:800; cursor:pointer; color: var(--primary); display:block; font-size: 1rem;">Công khai Bộ sưu tập này</label>
                 <div style="font-size: 0.8rem; color: var(--text-dim); margin-top: 0.2rem;">Khách hàng sẽ nhìn thấy bộ sưu tập này trên trang Haru Portfolio Hub.</div>
               </div>
            </div>
         </div>

         <!-- CỘT PHẢI: QUẢN LÝ ẢNH (MASONRY GRID) -->
         <div style="display:flex; flex-direction:column; gap:1.25rem; background: #f8fafc; padding: 1.5rem; border-radius: 16px; border: 1px dashed #cbd5e1;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start">
               <div>
                 <label style="font-weight:800; font-size: 1.1rem; color:var(--text-main); display:block; margin-bottom:0.3rem">Kho Ảnh Triển Lãm</label>
                 <div style="font-size: 0.85rem; color: var(--text-dim); line-height: 1.4;">Ảnh tải lên sẽ được hiển thị tự do đa kích thước trên trang Gallery. (Khuyên dùng ảnh dọc/ngang xáo trộn)</div>
               </div>
               <label for="pf-upload" class="btn btn-primary" style="padding: 0.6rem 1.2rem; cursor:pointer; font-size:0.9rem; font-weight: 600; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(22, 163, 74, 0.2);">
                  <i class="fas fa-cloud-upload-alt" style="margin-right: 0.4rem;"></i> Tải nhiều ảnh
               </label>
               <input type="file" id="pf-upload" multiple accept="image/*" style="display:none" onchange="window._handleImgBBUpload(event, '${t||""}')">
            </div>

            <div id="pf-upload-status" style="font-size:0.9rem; font-weight:600; padding: 0.75rem; background: #dcfce7; color:var(--primary); text-align:center; border-radius: 8px; display:none; align-items:center; justify-content:center; gap:0.5rem;">
               <i class="fas fa-spinner fa-spin"></i> <span>Đang xử lý...</span>
            </div>

            <div id="pf-gallery-preview" style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; overflow-y:auto; max-height:500px; padding-right:0.5rem; align-content: start;">
               <!-- Images will be rendered here -->
               ${n.images.length===0?`
                  <div style="grid-column: 1/-1; text-align:center; padding: 3rem 1rem; color:var(--text-dim); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap: 1rem;">
                     <div style="width: 64px; height: 64px; background: #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-images" style="font-size: 1.5rem; color: #94a3b8;"></i>
                     </div>
                     <div>
                        <div style="font-weight: 600; color: #64748b; margin-bottom: 0.25rem;">Chưa có ảnh nào được thêm</div>
                        <div style="font-size: 0.85rem;">Bấm "Tải nhiều ảnh" để bắt đầu nạp ảnh vào thư viện.</div>
                     </div>
                  </div>
               `:""}
               ${n.images.map((r,o)=>`
                 <div class="pf-img-item" style="position:relative; padding-bottom:100%; border-radius:10px; overflow:hidden; background:url('${r}') center/cover; border:1px solid var(--border); box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                   <button type="button" onclick="this.parentElement.remove()" style="position:absolute; top:6px; right:6px; width:28px; height:28px; border-radius:50%; background:rgba(239,68,68,0.9); border:none; color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 2px 5px rgba(0,0,0,0.3); backdrop-filter: blur(4px); transition: background 0.2s;" onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='rgba(239,68,68,0.9)'">
                      <i class="fas fa-times" style="font-size: 0.8rem;"></i>
                   </button>
                   <input type="hidden" class="pf-img-url" value="${r}">
                 </div>
               `).join("")}
            </div>
         </div>

      </div>
      <div class="modal-footer" style="margin-top:2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display:flex; justify-content:flex-end; gap: 1rem;">
         <button class="btn" onclick="this.closest('.modal-overlay').remove()" style="padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600;">Huỷ bỏ</button>
         <button class="btn btn-primary" onclick="window._savePortfolio('${n.id}')" style="padding: 0.75rem 2rem; border-radius: 8px; font-weight: 600; box-shadow: 0 4px 6px -1px rgba(22, 163, 74, 0.2);">
            <i class="fas fa-check-circle" style="margin-right: 0.4rem;"></i> Lưu Bộ Sưu Tập
         </button>
      </div>
    </div>
  `,document.body.appendChild(i),requestAnimationFrame(()=>{i.classList.add("active")})};window._handleImgBBUpload=async(t,e)=>{const n=t.target.files;if(!n||n.length===0)return;const i=document.getElementById("pf-upload-status"),r=document.getElementById("pf-gallery-preview"),o="06a22bc9051f55716fb1cd1d54658ba3";i.style.display="block",i.style.color="var(--primary)",i.innerText=`Đang xử lý ${n.length} ảnh...`,r.innerHTML.includes("Chưa có ảnh nào")&&(r.innerHTML="");let s=0;for(let a=0;a<n.length;a++){i.innerText=`Đang tải lên ${a+1}/${n.length}...`;try{const l=new FormData;l.append("image",n[a]);const p=await(await fetch(`https://api.imgbb.com/1/upload?key=${o}`,{method:"POST",body:l})).json();if(!p.success)throw new Error(p.error?.message||"Upload failed");const c=p.data.url,f=document.getElementById("pf-thumbnail"),u=document.getElementById("pf-thumb-preview");f&&!f.value.trim()&&(f.value=c,u&&(u.style.display="block",u.style.backgroundImage=`url('${c}')`));const h=document.createElement("div");h.className="pf-img-item",h.style.cssText=`position:relative; padding-bottom:100%; border-radius:8px; overflow:hidden; background:url('${c}') center/cover; border:1px solid var(--border); box-shadow: 0 4px 10px rgba(0,0,0,0.1)`,h.innerHTML=`
        <button type="button" onclick="this.parentElement.remove()" style="position:absolute; top:4px; right:4px; width:24px; height:24px; border-radius:50%; background:rgba(239,68,68,0.9); border:none; color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 2px 5px rgba(0,0,0,0.3)">×</button>
        <input type="hidden" class="pf-img-url" value="${c}">
      `,r.appendChild(h),s++}catch(l){console.error("Upload failed for file",n[a].name,l)}}i.innerText=`Đã tải xong ${s} ảnh!`,setTimeout(()=>{i.style.display="none"},3e3),t.target.value=""};window._handleThumbnailUpload=async t=>{const e=t.target.files[0];if(!e)return;const n=document.getElementById("pf-thumb-status"),i=document.getElementById("pf-thumb-preview"),r=document.getElementById("pf-thumbnail"),o="06a22bc9051f55716fb1cd1d54658ba3";n.style.display="block",n.style.color="var(--primary)",n.innerText="Đang tải lên ảnh bìa...";try{const s=new FormData;s.append("image",e);const l=await(await fetch(`https://api.imgbb.com/1/upload?key=${o}`,{method:"POST",body:s})).json();if(!l.success)throw new Error(l.error?.message||"Upload failed");const d=l.data.url;r.value=d,i.style.display="block",i.style.backgroundImage=`url('${d}')`,n.innerText="Tải lên thành công!"}catch(s){console.error("Upload failed for thumbnail",e.name,s),n.innerText="Lỗi tải lên: "+s.message,n.style.color="var(--danger)"}setTimeout(()=>{n.innerText==="Tải lên thành công!"&&(n.style.display="none")},3e3),t.target.value=""};window._savePortfolio=async t=>{const e=document.getElementById("pf-name").value.trim(),n=document.getElementById("pf-category").value,i=document.getElementById("pf-thumbnail").value.trim(),r=document.querySelectorAll(".pf-img-url"),o=Array.from(r).map(d=>d.value).filter(Boolean),s=i||o[0]||"";if(!e||!s){alert("Vui lòng nhập Tên bộ sưu tập và ít nhất 1 ảnh bìa/ảnh trong bộ sưu tập!");return}const a={id:t,jobName:e,category:n,date:document.getElementById("pf-date").value||new Date().toISOString(),thumbnail:s,videoLink:document.getElementById("pf-video")?.value?.trim()||"",photoLink:document.getElementById("pf-photo")?.value?.trim()||"",description:document.getElementById("pf-desc").value.trim(),images:o,isVisible:document.getElementById("pf-visible").checked};m.portfolios||(m.portfolios=[]);const l=m.portfolios.findIndex(d=>d.id===t);l>-1?(m.portfolios[l]=a,window.addHistory("Sửa Portfolio: "+e)):(m.portfolios.push(a),window.addHistory("Tạo Portfolio mới: "+e)),N();try{await We(m)}catch(d){console.warn("Sync Firebase sau khi lưu portfolio thất bại:",d?.message||d)}S(),document.querySelector(".portfolio-modal")?.remove()};let Pa=0,Ma=0,de=null;document.addEventListener("touchstart",t=>{const e=t.target.closest(".kanban-card, .ep-kanban-card, .ep-col-cards > div");e&&(Pa=t.changedTouches[0].screenX,Ma=t.changedTouches[0].screenY,de=e)},{passive:!0});document.addEventListener("touchend",t=>{if(!de||window.innerWidth>900)return;const e=t.changedTouches[0].screenX,n=t.changedTouches[0].screenY,i=e-Pa,r=Math.abs(n-Ma);if(Math.abs(i)>70&&r<50&&!de.classList.contains("locked-card")){const o=de.closest("[data-status]");if(o){const s=o.getAttribute("data-status"),a=o.parentElement,d=Array.from(a.children).filter(f=>f.hasAttribute("data-status")).map(f=>f.getAttribute("data-status")),p=d.indexOf(s);let c=null;if(i<0&&p<d.length-1?c=d[p+1]:i>0&&p>0&&(c=d[p-1]),c){const f=de.dataset.jobid||de.dataset.jobId,u=!!de.closest("#ep-kanban"),h=!!de.closest(".ev-col-cards"),v=!!de.closest(".ep-kanban-list");if(u&&window.updateEditStatus)window.updateEditStatus(f,de.dataset.svcname,c);else if(h&&window.updateVideoEditStatus){const g=m.jobs.find(_=>_.id===f);g&&g.services[de.dataset.sidx]&&window.updateVideoEditStatus(f,g.services[de.dataset.sidx].service,c)}else(v&&window.updateVideoEditStatus||window.updateVideoEditStatus)&&window.updateVideoEditStatus(f,de.dataset.sidx||de.dataset.svc,c)}}}de=null});window._deletePortfolio=t=>{const e=(m.portfolios||[]).find(n=>n.id===t);e&&window.haruConfirm(`Xóa vĩnh viễn bộ sưu tập "${e.jobName}"? (Không thể khôi phục)`,()=>{m.portfolios=m.portfolios.filter(n=>n.id!==t),window.addHistory("Xóa Portfolio: "+e.jobName),N(),S()})};let Re=[],$e=0;window._openLightbox=t=>{const e=Array.from(document.querySelectorAll(".portfolio-masonry-item img")).map(i=>i.src);if(e.length===0)return;Re=e,$e=t;const n=document.createElement("div");n.className="lightbox-overlay",n.id="pf-lightbox",n.style.cssText=`
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.95); z-index: 99999;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.3s;
  `,n.innerHTML=`
    <button onclick="window._closeLightbox()" style="position:absolute; top: 20px; right: 20px; background:none; border:none; color:#fff; font-size: 2rem; cursor:pointer; z-index: 10">×</button>
    
    <button onclick="window._lightboxNav(-1)" style="position:absolute; left: 20px; top: 50%; transform: translateY(-50%); background:rgba(255,255,255,0.1); border:none; color:#fff; width: 50px; height: 50px; border-radius: 50%; font-size: 1.5rem; cursor:pointer; z-index: 10; display:flex; align-items:center; justify-content:center; backdrop-filter: blur(4px)">❮</button>
    
    <img id="pf-lightbox-img" src="${Re[$e]}" style="max-width: 90vw; max-height: 90vh; object-fit: contain; transition: opacity 0.2s" />
    
    <div id="pf-lightbox-counter" style="position:absolute; bottom: 20px; left: 50%; transform: translateX(-50%); color: rgba(255,255,255,0.7); font-size: 0.9rem; font-family: sans-serif; letter-spacing: 2px">
      ${$e+1} / ${Re.length}
    </div>

    <button onclick="window._lightboxNav(1)" style="position:absolute; right: 20px; top: 50%; transform: translateY(-50%); background:rgba(255,255,255,0.1); border:none; color:#fff; width: 50px; height: 50px; border-radius: 50%; font-size: 1.5rem; cursor:pointer; z-index: 10; display:flex; align-items:center; justify-content:center; backdrop-filter: blur(4px)">❯</button>
  `,document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity="1"}),window._lightboxKeydownHandler=i=>{i.key==="Escape"&&window._closeLightbox(),i.key==="ArrowRight"&&window._lightboxNav(1),i.key==="ArrowLeft"&&window._lightboxNav(-1)},document.addEventListener("keydown",window._lightboxKeydownHandler)};window._closeLightbox=()=>{const t=document.getElementById("pf-lightbox");t&&(t.style.opacity="0",setTimeout(()=>{t.remove(),document.removeEventListener("keydown",window._lightboxKeydownHandler)},300))};window._lightboxNav=t=>{if(Re.length===0)return;$e+=t,$e<0&&($e=Re.length-1),$e>=Re.length&&($e=0);const e=document.getElementById("pf-lightbox-img"),n=document.getElementById("pf-lightbox-counter");e&&n&&(e.style.opacity="0",setTimeout(()=>{e.src=Re[$e],n.innerText=`${$e+1} / ${Re.length}`,e.style.opacity="1"},150))};window.filterGear=(t,e)=>{document.querySelectorAll(".filter-group .filter-btn").forEach(i=>i.classList.remove("active")),t&&t.classList.add("active"),document.querySelectorAll(".gear-item-card").forEach(i=>{e==="ALL"||i.getAttribute("data-type")===e?i.style.display="block":i.style.display="none"})};window.filterGearCat=(t,e)=>{document.querySelectorAll(".filter-group .filter-btn").forEach(i=>i.classList.remove("active")),t&&t.classList.add("active"),document.querySelectorAll(".gear-item-card").forEach(i=>{e==="ALL"||i.getAttribute("data-category")===e?i.style.display="block":i.style.display="none"})};window.promptAddGear=()=>{const t=["Camera","Body CAM","Lens","Flycam","Gimbal","Flash","Filter","Thiết bị âm thanh","Thiết bị sạc","Thiết bị đựng","Phụ kiện quay","Lưu trữ","Màn hình","Truyền hình ảnh","Tủ chống ẩm","Văn phòng","Đèn Led","Balo","Khác"],e=document.createElement("div");e.id="gear-modal-overlay",e.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem",e.innerHTML=`
    <div style="background:#fff;border-radius:16px;padding:1.5rem;max-width:440px;width:100%;box-shadow:0 16px 40px rgba(0,0,0,0.2)">
      <h3 style="font-size:1.1rem;font-weight:900;margin:0 0 1rem 0;color:var(--text-main)">📦 Thêm Thiết Bị Mới</h3>
      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <input id="gear-name" placeholder="Tên thiết bị *" style="padding:0.6rem 0.8rem;border:1.5px solid var(--border);border-radius:8px;font-size:0.9rem;font-family:inherit" />
        <select id="gear-cat" style="padding:0.6rem 0.8rem;border:1.5px solid var(--border);border-radius:8px;font-size:0.9rem;font-family:inherit">
          ${t.map(n=>`<option value="${n}">${n}</option>`).join("")}
        </select>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem">
          <input id="gear-price" type="number" placeholder="Giá trị (VNĐ)" style="padding:0.6rem 0.8rem;border:1.5px solid var(--border);border-radius:8px;font-size:0.9rem;font-family:inherit" />
          <input id="gear-qty" type="number" placeholder="Số lượng" value="1" min="1" style="padding:0.6rem 0.8rem;border:1.5px solid var(--border);border-radius:8px;font-size:0.9rem;font-family:inherit" />
        </div>
        <input id="gear-serial" placeholder="Serial (tuỳ chọn)" style="padding:0.6rem 0.8rem;border:1.5px solid var(--border);border-radius:8px;font-size:0.9rem;font-family:inherit" />
        <input id="gear-notes" placeholder="Ghi chú (tuỳ chọn)" style="padding:0.6rem 0.8rem;border:1.5px solid var(--border);border-radius:8px;font-size:0.9rem;font-family:inherit" />
      </div>
      <div style="display:flex;gap:0.5rem;margin-top:1rem;justify-content:flex-end">
        <button onclick="document.getElementById('gear-modal-overlay').remove()" style="padding:0.5rem 1rem;border:1px solid var(--border);border-radius:8px;background:#fff;cursor:pointer;font-weight:700;font-family:inherit">Huỷ</button>
        <button id="gear-save-btn" style="padding:0.5rem 1rem;border:none;border-radius:8px;background:var(--primary);color:#fff;cursor:pointer;font-weight:700;font-family:inherit">Lưu</button>
      </div>
    </div>`,document.body.appendChild(e),e.querySelector("#gear-save-btn").onclick=()=>{const n=document.getElementById("gear-name").value.trim();if(!n){document.getElementById("gear-name").style.borderColor="#ef4444";return}const i={id:"g_"+Date.now(),name:n,type:document.getElementById("gear-cat").value,category:document.getElementById("gear-cat").value,price:parseInt(document.getElementById("gear-price").value)||0,qty:parseInt(document.getElementById("gear-qty").value)||1,serial:document.getElementById("gear-serial").value.trim(),notes:document.getElementById("gear-notes").value.trim(),status:"Sẵn sàng"};m.gears=m.gears||[],m.gears.push(i),N(),S(),e.remove()},setTimeout(()=>document.getElementById("gear-name").focus(),100)};window.promptEditGear=t=>{const e=m.gears.find(i=>i.id===t);if(!e)return;const n=document.createElement("div");n.id="gear-modal-overlay",n.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem",n.innerHTML=`
    <div style="background:#fff;border-radius:16px;padding:1.5rem;max-width:440px;width:100%;box-shadow:0 16px 40px rgba(0,0,0,0.2)">
      <h3 style="font-size:1.1rem;font-weight:900;margin:0 0 1rem 0;color:var(--text-main)">🔧 Chỉnh sửa: ${e.name}</h3>
      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <input id="ge-name" value="${e.name}" style="padding:0.6rem 0.8rem;border:1.5px solid var(--border);border-radius:8px;font-size:0.9rem;font-family:inherit" />
        <input id="ge-serial" value="${e.serial||""}" placeholder="Serial" style="padding:0.6rem 0.8rem;border:1.5px solid var(--border);border-radius:8px;font-size:0.9rem;font-family:inherit" />
        <input id="ge-notes" value="${e.notes||""}" placeholder="Ghi chú" style="padding:0.6rem 0.8rem;border:1.5px solid var(--border);border-radius:8px;font-size:0.9rem;font-family:inherit" />
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem">
          <input id="ge-price" type="number" value="${e.price||0}" placeholder="Giá" style="padding:0.6rem 0.8rem;border:1.5px solid var(--border);border-radius:8px;font-size:0.9rem;font-family:inherit" />
          <input id="ge-qty" type="number" value="${e.qty||1}" min="1" placeholder="SL" style="padding:0.6rem 0.8rem;border:1.5px solid var(--border);border-radius:8px;font-size:0.9rem;font-family:inherit" />
        </div>
        <select id="ge-status" style="padding:0.6rem 0.8rem;border:1.5px solid var(--border);border-radius:8px;font-size:0.9rem;font-family:inherit">
          <option value="Sẵn sàng" ${e.status==="Sẵn sàng"?"selected":""}>✅ Sẵn sàng</option>
          <option value="Đang bảo trì" ${e.status==="Đang bảo trì"?"selected":""}>🔧 Đang bảo trì</option>
          <option value="Đang xuất kho" ${e.status==="Đang xuất kho"?"selected":""}>📦 Đang xuất kho</option>
        </select>
      </div>
      <div style="display:flex;gap:0.5rem;margin-top:1rem;justify-content:space-between">
        <button id="ge-del-btn" style="padding:0.5rem 1rem;border:1px solid #ef4444;border-radius:8px;background:#fff;color:#ef4444;cursor:pointer;font-weight:700;font-family:inherit">🗑 Xoá</button>
        <div style="display:flex;gap:0.5rem">
          <button onclick="document.getElementById('gear-modal-overlay').remove()" style="padding:0.5rem 1rem;border:1px solid var(--border);border-radius:8px;background:#fff;cursor:pointer;font-weight:700;font-family:inherit">Huỷ</button>
          <button id="ge-save-btn" style="padding:0.5rem 1rem;border:none;border-radius:8px;background:var(--primary);color:#fff;cursor:pointer;font-weight:700;font-family:inherit">Lưu</button>
        </div>
      </div>
    </div>`,document.body.appendChild(n),n.querySelector("#ge-save-btn").onclick=()=>{e.name=document.getElementById("ge-name").value.trim()||e.name,e.serial=document.getElementById("ge-serial").value.trim(),e.notes=document.getElementById("ge-notes").value.trim(),e.price=parseInt(document.getElementById("ge-price").value)||0,e.qty=parseInt(document.getElementById("ge-qty").value)||1,e.status=document.getElementById("ge-status").value,N(),S(),n.remove()},n.querySelector("#ge-del-btn").onclick=()=>{confirm("Chắc chắn xóa thiết bị này?")&&(m.gears=m.gears.filter(i=>i.id!==t),N(),S(),n.remove())}};window.promptCheckoutGear=t=>{const e=m.gears.find(i=>i.id===t);if(!e)return;if(e.status==="Đang bảo trì"){alert("Thiết bị đang bảo trì, không thể xuất kho!");return}const n=document.createElement("div");n.id="gear-modal-overlay",n.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem",n.innerHTML=`
    <div style="background:#fff;border-radius:16px;padding:1.5rem;max-width:400px;width:100%;box-shadow:0 16px 40px rgba(0,0,0,0.2)">
      <h3 style="font-size:1.1rem;font-weight:900;margin:0 0 0.3rem 0;color:var(--text-main)">📤 Xuất Kho: ${e.name}</h3>
      <p style="font-size:0.8rem;color:var(--text-dim);margin:0 0 1rem 0">Ghi nhận thiết bị được mượn / mang đi sự kiện</p>
      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <input id="co-staff" placeholder="Nhân sự mượn *" style="padding:0.6rem 0.8rem;border:1.5px solid var(--border);border-radius:8px;font-size:0.9rem;font-family:inherit" />
        <input id="co-job" placeholder="Mã Job / Sự kiện (tuỳ chọn)" style="padding:0.6rem 0.8rem;border:1.5px solid var(--border);border-radius:8px;font-size:0.9rem;font-family:inherit" />
      </div>
      <div style="display:flex;gap:0.5rem;margin-top:1rem;justify-content:flex-end">
        <button onclick="document.getElementById('gear-modal-overlay').remove()" style="padding:0.5rem 1rem;border:1px solid var(--border);border-radius:8px;background:#fff;cursor:pointer;font-weight:700;font-family:inherit">Huỷ</button>
        <button id="co-save-btn" style="padding:0.5rem 1rem;border:none;border-radius:8px;background:var(--primary);color:#fff;cursor:pointer;font-weight:700;font-family:inherit">Xuất Kho</button>
      </div>
    </div>`,document.body.appendChild(n),n.querySelector("#co-save-btn").onclick=()=>{const i=document.getElementById("co-staff").value.trim();if(!i){document.getElementById("co-staff").style.borderColor="#ef4444";return}const r={id:"gb_"+Date.now(),gearId:e.id,staff:i,jobId:document.getElementById("co-job").value.trim(),outDate:new Date().toISOString(),status:"out"};m.gearBookings=m.gearBookings||[],m.gearBookings.push(r),N(),S(),n.remove()},setTimeout(()=>document.getElementById("co-staff").focus(),100)};window.returnGear=t=>{const e=(m.gearBookings||[]).find(n=>n.gearId===t&&n.status==="out");e&&confirm(`Xác nhận thu hồi thiết bị từ ${e.staff}?`)&&(e.status="returned",e.inDate=new Date().toISOString(),N(),S())};(m.gears||[]).forEach(t=>{t.status||(t.status="Sẵn sàng"),t.category||(t.category=t.type||"Khác"),(t.price===void 0||t.price===null)&&(t.price=0),t.qty||(t.qty=1)});const fm=(m.gears||[]).some(t=>t.id&&t.id.startsWith("g_seed_"));if(!fm){const e=[{name:"Sony A7s3+rig",type:"Camera",category:"Body CAM",price:57e6,qty:1},{name:"Sony A7iv+rig",type:"Camera",category:"Body CAM",price:4e7,qty:1},{name:"Pin FZ100: 2zin + 4 đỏ + 1 K&F",type:"Camera",category:"Body CAM",price:25e5,qty:7},{name:"Pocket 3",type:"Camera",category:"Body CAM",price:12e6,qty:1},{name:"Cam360 X4 + 2 pin",type:"Camera",category:"Body CAM",price:13e6,qty:1},{name:"Mavic Mini 3 Pro 2pin",type:"Flycam",category:"Body CAM",price:14e6,qty:1},{name:"Fujifilm Instax Mini Evo",type:"Camera",category:"Body CAM",price:54e5,qty:1},{name:"Sigma 28-45mm F1.8",type:"Lens",category:"Lens",price:275e5,qty:1},{name:"Sony 16-35mm F2.8 GM",type:"Lens",category:"Lens",price:29e6,qty:1},{name:"Sony 85mm F1.4 GM",type:"Lens",category:"Lens",price:41e6,qty:1},{name:"Sony 50mm F1.4 GM",type:"Lens",category:"Lens",price:31e6,qty:1},{name:"Máy ghi âm Tascam X8",type:"Audio",category:"Thiết bị âm thanh",price:11e6,qty:1},{name:"Máy ghi âm Olympus L-11",type:"Audio",category:"Thiết bị âm thanh",price:1e6,qty:1},{name:"Mic Hollyland Max2 + 2 miclab",type:"Audio",category:"Thiết bị âm thanh",price:7e6,qty:1},{name:"Deity TC-1",type:"Audio",category:"Thiết bị âm thanh",price:105e5,qty:1},{name:"Máy ghi âm PR-2",type:"Audio",category:"Thiết bị âm thanh",price:12e6,qty:2},{name:"Mic thu âm đầu mic",type:"Audio",category:"Thiết bị âm thanh",price:16e5,qty:1},{name:"Hollyland MARS 300 PRO + 4pin NF",type:"Audio",category:"Truyền hình ảnh",price:4e6,qty:1},{name:"iPad Pro 12.9in 2018 1TB 4G",type:"Dựng",category:"Thiết bị dựng",price:15e6,qty:1},{name:"Mac Mini M4 16/256",type:"Dựng",category:"Thiết bị dựng",price:126e5,qty:1},{name:"MacBook Air M1 15/512",type:"Dựng",category:"Thiết bị dựng",price:175e5,qty:1},{name:"MacBook Pro 14 16/512",type:"Dựng",category:"Thiết bị dựng",price:32e6,qty:1},{name:"Chuột Logitech Master 3",type:"Dựng",category:"Thiết bị dựng",price:2e6,qty:1},{name:"Máy in Brother",type:"Khác",category:"Văn phòng",price:17e5,qty:1},{name:"Nguồn UPS",type:"Khác",category:"Văn phòng",price:8e5,qty:1},{name:"Pin dự phòng Ugreen 25000mAh",type:"Khác",category:"Văn phòng",price:15e5,qty:1},{name:"Thổi bụi Nitecore",type:"Khác",category:"Văn phòng",price:8e5,qty:1},{name:"HUB Hagibit + SSD 500GB",type:"Khác",category:"Văn phòng",price:3e6,qty:1},{name:"Bàn phím iPad",type:"Khác",category:"Văn phòng",price:5e5,qty:1},{name:"Switch LAN Xiaomi",type:"Khác",category:"Văn phòng",price:14e5,qty:1},{name:"Quạt không cánh",type:"Khác",category:"Văn phòng",price:32e5,qty:1},{name:"Loa Oppo",type:"Khác",category:"Văn phòng",price:5e5,qty:1},{name:"Quạt nhỏ",type:"Khác",category:"Văn phòng",price:15e4,qty:1},{name:"NAS Synology - 20TB",type:"Lưu trữ",category:"Lưu trữ",price:11e6,qty:1},{name:"HUB Acasis 40Gb",type:"Lưu trữ",category:"Lưu trữ",price:18e5,qty:1},{name:"Box ổ cứng 2TB",type:"Lưu trữ",category:"Lưu trữ",price:25e5,qty:1},{name:"NAS Orico - 8TB",type:"Lưu trữ",category:"Lưu trữ",price:85e5,qty:1},{name:"HDD 8TB",type:"Lưu trữ",category:"Lưu trữ",price:65e5,qty:2},{name:"HDD 10TB",type:"Lưu trữ",category:"Lưu trữ",price:7e6,qty:2},{name:"HDD 1TB Di động",type:"Lưu trữ",category:"Lưu trữ",price:5e5,qty:1},{name:"Dox ổ cứng RAID - 16TB",type:"Lưu trữ",category:"Lưu trữ",price:11e6,qty:1},{name:"Dọc ổ cứng 5 bay",type:"Lưu trữ",category:"Lưu trữ",price:11e6,qty:1},{name:"Samsung T7 - 2TB",type:"Lưu trữ",category:"Lưu trữ",price:101e5,qty:4},{name:"SanDisk XS1000",type:"Lưu trữ",category:"Lưu trữ",price:2e6,qty:1},{name:"SSD NVMe 1TB WD",type:"Lưu trữ",category:"Lưu trữ",price:3e6,qty:2},{name:"Thẻ nhớ 128GB SD (nhanh)",type:"Lưu trữ",category:"Lưu trữ",price:8e6,qty:12},{name:"Thẻ nhớ 128GB SD",type:"Lưu trữ",category:"Lưu trữ",price:22e5,qty:4},{name:"Thẻ nhớ 128GB MicroSD",type:"Lưu trữ",category:"Lưu trữ",price:0,qty:5},{name:"Thẻ nhớ 64GB SD",type:"Lưu trữ",category:"Lưu trữ",price:0,qty:7},{name:"Đọc thẻ nhớ Ugreen",type:"Lưu trữ",category:"Lưu trữ",price:2e5,qty:1},{name:"Gimbal RS3 Pro",type:"Gimbal",category:"Phụ kiện quay",price:125e5,qty:1},{name:"Chân mono Ulanzi MT79",type:"Khác",category:"Phụ kiện quay",price:48e4,qty:1},{name:"Chân mono Ulanzi",type:"Khác",category:"Phụ kiện quay",price:12e5,qty:1},{name:"Monopod M500A",type:"Khác",category:"Phụ kiện quay",price:2e6,qty:1},{name:"Chân máy quay",type:"Khác",category:"Phụ kiện quay",price:1e6,qty:1},{name:"Hollyland Solidcom C1-4S",type:"Audio",category:"Phụ kiện quay",price:21e6,qty:1},{name:"Bộ đàm 4 cái + tai nghe",type:"Audio",category:"Phụ kiện quay",price:2e6,qty:1},{name:"Kẹp macsef iPhone Ulanzi",type:"Khác",category:"Phụ kiện quay",price:3e5,qty:1},{name:"Tủ chống ẩm 80L",type:"Khác",category:"Tủ chống ẩm",price:26e5,qty:1},{name:"Tủ chống ẩm 100L",type:"Khác",category:"Tủ chống ẩm",price:44e5,qty:1},{name:"Đèn Molus X100 + Pin",type:"Flash",category:"Đèn Led",price:7e6,qty:1},{name:"Chân đèn gấp gọn",type:"Flash",category:"Đèn Led",price:1e6,qty:2},{name:"Chân đèn MT01",type:"Flash",category:"Đèn Led",price:1e6,qty:1},{name:"Sony HVL F60RM2",type:"Flash",category:"Flash",price:18e6,qty:2},{name:"Sony HVL F60RM",type:"Flash",category:"Flash",price:65e5,qty:1},{name:"Nguồn Flash",type:"Flash",category:"Flash",price:3e6,qty:1},{name:"Filter K&F ND 82",type:"Lens",category:"Filter",price:1e6,qty:1},{name:"Blackmist 1/4 K&F 67mm",type:"Lens",category:"Filter",price:5e5,qty:1},{name:"Filter K&F UV 67/77/82",type:"Lens",category:"Filter",price:2e6,qty:4},{name:"Dox sạc FZ100 Tilta",type:"Khác",category:"Thiết bị sạc",price:8e5,qty:1},{name:"Sạc pin AA",type:"Khác",category:"Thiết bị sạc",price:12e5,qty:1},{name:"Sạc 65W",type:"Khác",category:"Thiết bị sạc",price:5e5,qty:1},{name:"12 Pin AA",type:"Khác",category:"Thiết bị sạc",price:2e6,qty:12},{name:"4 Pin AA",type:"Khác",category:"Thiết bị sạc",price:2e5,qty:4},{name:"Sạc pin Flycam",type:"Khác",category:"Thiết bị sạc",price:7e5,qty:1},{name:"Balo Pytech 35L",type:"Khác",category:"Balo",price:68e5,qty:1},{name:"Balo Pytech 22L",type:"Khác",category:"Balo",price:15e5,qty:1},{name:"Túi đeo chéo K&F",type:"Khác",category:"Balo",price:5e5,qty:1},{name:"Thùng Máy",type:"Khác",category:"Balo",price:4e6,qty:1},{name:"Hộp thẻ nhớ",type:"Khác",category:"Balo",price:2e5,qty:1},{name:"Samsung 4K 28in",type:"Dựng",category:"Màn hình",price:7e6,qty:1},{name:"LG 4K 27in",type:"Dựng",category:"Màn hình",price:36e5,qty:1}].map((n,i)=>({id:"g_seed_"+i,name:n.name,type:n.type,category:n.category,price:n.price,qty:n.qty||1,serial:"",notes:"",status:"Sẵn sàng"}));m.gears=[...m.gears||[],...e],console.log(`✅ Seed ${e.length} thiết bị từ Google Sheet (tổng: ${m.gears.length})`),N()}S();window.addEventListener("haruExternalImport",t=>{const e=t.detail;e&&(window.showPage("portfolios"),window._openPortfolioModal(null,e))});setTimeout(()=>{const t=localStorage.getItem("haru_fb_import");if(t)try{const e=JSON.parse(t);localStorage.removeItem("haru_fb_import"),window.showPage("portfolios"),window._openPortfolioModal(null,e)}catch(e){console.error("Error importing fb data on load",e)}},500);
