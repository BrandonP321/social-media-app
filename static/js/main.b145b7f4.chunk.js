(this["webpackJsonpsocial-media-app"]=this["webpackJsonpsocial-media-app"]||[]).push([[0],{46:function(e,t,a){},47:function(e,t,a){},48:function(e,t,a){},71:function(e,t,a){},72:function(e,t,a){},76:function(e,t,a){},77:function(e,t,a){},78:function(e,t,a){},79:function(e,t,a){},80:function(e,t,a){},81:function(e,t,a){},82:function(e,t,a){},83:function(e,t,a){},84:function(e,t,a){"use strict";a.r(t);var c=a(1),s=a.n(c),n=a(37),r=a.n(n),o=(a(46),a(47),a(7)),i=a(5),l=a(38),u=a(2),j=(a(48),a(4)),d=a(18),b=a(14),p=a(24),h=a.n(p),m=a(39),O=a(9),f=a.n(O),x=a(10),g=(a(71),a(72),a(0));function v(e){var t=Object(i.f)();return Object(g.jsxs)("div",{className:"header-search-results-wrapper".concat(e.show?"":" hide"),children:[Object(g.jsx)(j.a,{icon:b.c,className:"search-results-spinner".concat(e.isLoading?"":" hide")}),e.results.map((function(e){return Object(g.jsxs)("div",{className:"search-result",children:[Object(g.jsx)("div",{className:"profile-img",children:Object(g.jsx)("img",{src:e.profilePicture||"https://i.imgur.com/dCc7ake.png",alt:"user profile picture",onClick:function(){return t.push("/user/"+e.username)}})}),Object(g.jsx)("p",{className:"username",onClick:function(){return t.push("/user/"+e.username)},children:e.username})]})}))]})}function N(e){var t=Object(i.f)(),a=(Object(i.g)(),Object(c.useRef)()),s=Object(c.useRef)(),n=Object(c.useRef)(),r=Object(c.useState)(!1),l=Object(u.a)(r,2),p=l[0],h=l[1],m=Object(c.useState)([]),O=Object(u.a)(m,2),f=O[0],N=O[1],w=Object(c.useState)(!1),C=Object(u.a)(w,2),S=C[0],y=C[1],P=Object(c.useState)(!1),I=Object(u.a)(P,2),L=I[0],U=I[1],T=Object(c.useState)(null),F=Object(u.a)(T,2),E=F[0],R=F[1];Object(c.useEffect)((function(){k.validateUserLoggedIn().then((function(a){if(!a)return t.push("/login");e.handleTokenInfo&&e.handleTokenInfo(a.data),R(a.data.username)})).catch((function(e){t.push("/login")})),document.addEventListener("click",(function(e){var t=e.target;n.current&&!n.current.contains(t)&&y(!1)}))}),[]);var _=Object(c.useCallback)((function(){E?window.location.href="/user/"+E:t.push("/login")}),[E]);return Object(g.jsx)("header",{children:Object(g.jsxs)("div",{className:"header-flex",children:[Object(g.jsx)("div",{className:"flex-item-group",children:Object(g.jsx)(o.b,{to:"/",className:"brand",children:Object(g.jsx)("h1",{children:"Title"})})}),Object(g.jsxs)("div",{className:"flex-item-group search".concat(e.isLoginPage?" hide":""),ref:n,children:[Object(g.jsxs)("form",{ref:s,className:"header-search-wrapper".concat(p?" focused":"").concat(S?" hide-bottom-border":""),onSubmit:function(e){e.preventDefault();var t=a.current.value;U(!0),y(!0),k.getSearchResults(t).then((function(e){console.log(e),N(e.data)})).catch((function(e){console.log(e.response)})).finally((function(){U(!1)}))},children:[Object(g.jsx)("input",{ref:a,className:"search-bar",placeholder:"search","aria-label":"search bar",onFocus:function(){return h(!0)},onBlur:function(){return h(!1)}}),Object(g.jsx)("button",{className:"search-icon-btn","aria-label":"search",children:Object(g.jsx)(j.a,{icon:x.b})})]}),Object(g.jsx)(v,{results:f,show:S,setShow:y,isLoading:L})]}),Object(g.jsxs)("div",{className:"flex-item-group link-icons".concat(e.isLoginPage?" hide":""),children:[Object(g.jsx)(o.b,{to:"/search","aria-label":"search",className:"nav-link search",children:Object(g.jsx)(j.a,{icon:b.b})}),Object(g.jsx)(o.b,{to:"/","aria-label":"home",className:"nav-link",children:Object(g.jsx)(j.a,{icon:b.a})}),Object(g.jsx)("button",{"aria-label":"profile page",className:"nav-link",onClick:_,children:Object(g.jsx)(j.a,{icon:d.b})})]})]})})}var w="https://desolate-atoll-73866.herokuapp.com",k={updatePostLikeStatus:function(e,t){return f.a.put("".concat(w,"/api/post/status/likes"),{id:e,userLikedPost:t})},getUser:function(e,t){return f.a.get("".concat(w,"/api/user/").concat(e),C())},getUserPosts:function(e){return f.a.get("".concat(w,"/api/user/").concat(e,"/posts"))},createUser:function(e){return f.a.post("".concat(w,"/api/user/create"),e)},userLogin:function(e){return f.a.post("".concat(w,"/api/user/login"),e)},userUpdate:function(e){return f.a.put("".concat(w,"/api/user/update"),e,{headers:{"auth-token":localStorage.getItem("accessToken")}})},followUser:function(e){return f.a.put("".concat(w,"/api/user/").concat(e,"/follow"),null,C())},unfollowUser:function(e){return f.a.put("".concat(w,"/api/user/").concat(e,"/unfollow"),null,C())},getPost:function(e){return f.a.get("".concat(w,"/api/post/").concat(e),C())},createPost:function(e){return f.a.post("".concat(w,"/api/post/create"),e,{headers:{"auth-token":localStorage.getItem("accessToken")}})},deletePost:function(e){return f.a.delete("".concat(w,"/api/post/").concat(e,"/delete"),C())},getHomePagePosts:function(){return f.a.get("".concat(w,"/api/posts/following"),{headers:{"auth-token":localStorage.getItem("accessToken")}})},getSearchResults:function(e){return f.a.get("".concat(w,"/api/user/search/").concat(e))},validateUserLoggedIn:function(){var e=Object(m.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=localStorage.getItem("accessToken")){e.next=3;break}return e.abrupt("return",!1);case 3:return e.abrupt("return",f.a.get("".concat(w,"/api/auth/token"),{headers:{"auth-token":t}}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),uploadToCloudinary:function(e){return f.a.post("https://api.cloudinary.com/v1_1/dka83rgpq/image/upload",{file:e,upload_preset:"ienclaiw"})},uploadProfilePic:function(e){return f.a.post("https://api.cloudinary.com/v1_1/dka83rgpq/image/upload",{file:e,upload_preset:"social-profile"})},likePost:function(e){return f.a.put("".concat(w,"/api/post/").concat(e,"/like"),null,C())},unlikePost:function(e){return f.a.put("".concat(w,"/api/post/").concat(e,"/unlike"),null,C())}};function C(){return{headers:{"auth-token":localStorage.getItem("accessToken")}}}function S(e){var t=Object(i.f)(),a=Object(c.useState)(null),s=Object(u.a)(a,2),n=s[0],r=s[1];Object(c.useEffect)((function(){k.validateUserLoggedIn().then((function(e){var t=e.data.username;r(t)}))}),[]);return Object(g.jsxs)("footer",{children:[Object(g.jsx)(o.b,{to:"/search","aria-label":"search",className:"footer-nav-link",children:Object(g.jsx)(j.a,{icon:b.b})}),Object(g.jsx)(o.b,{to:"/","aria-label":"home",className:"footer-nav-link",children:Object(g.jsx)(j.a,{icon:b.a})}),Object(g.jsx)("button",{"aria-label":"messages",className:"footer-nav-link",onClick:function(){n?window.location.href="/user/"+n:t.push("/login")},children:Object(g.jsx)(j.a,{icon:d.b})})]})}var y=a(41);a(76);function P(e){var t=Object(i.f)(),a=Object(c.useState)(e.post.hasLiked),s=Object(u.a)(a,2),n=s[0],r=s[1],l=Object(c.useState)(!1),b=Object(u.a)(l,2),p=b[0],h=b[1],m=Object(c.useRef)(!1);Object(c.useEffect)((function(){h(e.loggedInUser&&e.loggedInUser.id===e.user._id)}),[e.loggedInUser]);var O=Object(c.useCallback)((function(a){m.current||(r(!n),m.current=!0,n?k.unlikePost(e.post._id).then((function(e){console.log(e)})).catch((function(e){if(console.log(e.response),e.response.status)switch(e.response.status){case 500:r(!n);break;case 401:case 403:alert("Your session has timed out"),t.push("/login")}})).finally((function(){m.current=!1})):k.likePost(e.post._id).then((function(e){console.log(e)})).catch((function(e){if(console.log(e.response),e.response&&e.response.status)switch(e.response.status){case 500:r(!n);break;case 401:case 403:alert("Your session has timed out"),t.push("/login")}})).finally((function(){m.current=!1})))}),[n]),f=Object(c.useCallback)((function(){k.deletePost(e.post._id).then((function(a){t.push("/user/".concat(e.loggedInUser.username))})).catch((function(e){console.log(e.response)}))}),[e.loggedInUser]);return Object(g.jsxs)("div",{className:"post-card",children:[Object(g.jsxs)("div",{className:"user-info",children:[Object(g.jsx)("div",{className:"profile-img-wrapper",children:Object(g.jsx)("img",{src:e.user.profilePicture||"https://i.imgur.com/dCc7ake.png",alt:"User profile picture"})}),Object(g.jsx)(o.b,{to:"/user/".concat(e.user.username),className:"username",children:e.user.username}),Object(g.jsx)(j.a,{icon:y.a,className:"post-delete-icon".concat(e.isPostPage&&p?"":" hide"),onClick:f})]}),Object(g.jsxs)("div",{className:"post-content",children:[Object(g.jsx)("div",{className:"post-img-wrapper",children:Object(g.jsx)("img",{src:e.post.img,alt:"post image"})}),Object(g.jsxs)("div",{className:"post-details",children:[Object(g.jsxs)("div",{className:"likes-wrapper",children:[Object(g.jsx)(j.a,{icon:n?d.a:x.a,className:"heart-icon".concat(n?" liked":""),onClick:function(){return O(e.post.id)}}),Object(g.jsx)("p",{className:"likes-number",children:e.post.likes})]}),Object(g.jsx)("div",{className:"caption-wrapper",children:e.post.caption})]})]})]})}a(77);function I(e){var t=Object(c.useRef)();return Object(c.useEffect)((function(){!1===e.show&&(t.current.classList.add("fade"),setTimeout((function(){t.current.classList.add("hide")}),2e3))}),[e.show]),Object(g.jsx)("div",{ref:t,className:"preloader",children:Object(g.jsxs)("div",{className:"loading-circles",children:[Object(g.jsx)("div",{className:"circle one"}),Object(g.jsx)("div",{className:"circle two"}),Object(g.jsx)("div",{className:"circle three"}),Object(g.jsx)("div",{className:"circle four"})]})})}a(78);function L(){Object(i.f)();var e=Object(c.useState)(!1),t=Object(u.a)(e,2),a=t[0],s=t[1],n=Object(c.useState)([]),r=Object(u.a)(n,2),o=r[0],j=r[1];return Object(c.useEffect)((function(){k.getHomePagePosts().then((function(e){var t,a=Object(l.a)(e.data.posts);try{for(a.s();!(t=a.n()).done;){var c=t.value;c.likedBy.includes(e.data.user.id)?c.hasLiked=!0:c.hasLiked=!1}}catch(s){a.e(s)}finally{a.f()}j(e.data.posts)})).catch((function(e){console.log(e)})).finally((function(){console.log("page is loaded"),s(!0)}))}),[]),Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(I,{show:!a}),Object(g.jsxs)("div",{className:"home-page-wrapper",children:[Object(g.jsx)(N,{}),Object(g.jsx)("div",{className:"content-header-footer-offset",children:Object(g.jsx)("div",{className:"content-main-responsive",children:o.map((function(e){return Object(g.jsx)(P,{user:e.creator,post:e})}))})}),Object(g.jsx)(S,{})]})]})}var U=a(16),T=a(6);a(79);function F(){var e=Object(i.f)(),t=Object(c.useState)(!1),a=Object(u.a)(t,2),s=a[0],n=a[1],r=Object(c.useState)(!1),o=Object(u.a)(r,2),l=o[0],d=o[1],b=Object(c.useState)(!1),p=Object(u.a)(b,2),h=p[0],m=p[1],O=Object(c.useState)(!1),f=Object(u.a)(O,2),v=f[0],w=f[1],C=Object(c.useState)(""),S=Object(u.a)(C,2),y=S[0],P=S[1],L=Object(c.useState)(""),F=Object(u.a)(L,2),E=F[0],R=F[1],_=Object(c.useState)({email:{value:"",helperText:"Please enter an email"},password:{value:"",helperText:"Please enter a password"}}),D=Object(u.a)(_,2),B=D[0],A=D[1],q=Object(c.useState)({email:{value:"",helperText:"Please enter an email"},username:{value:"",helperText:"Please enter a username"},name:{value:"",helperText:"Please enter your name"},password:{value:"",helperText:"Please enter a password"},passwordReEnter:{value:"",helperText:"Please re-enter your password"}}),Y=Object(u.a)(q,2),H=Y[0],J=Y[1],M=function(){d(!l)},z=function(e){var t=e.target.name,a=e.target.value;A(Object(T.a)(Object(T.a)({},B),{},Object(U.a)({},t,Object(T.a)(Object(T.a)({},B[t]),{},{value:a}))))},G=function(e){var t=e.target.name,a=e.target.value;J(Object(T.a)(Object(T.a)({},H),{},Object(U.a)({},t,Object(T.a)(Object(T.a)({},H[t]),{},{value:a}))))},K=Object(c.useCallback)((function(t){if(t.preventDefault(),P(""),V(Object(T.a)({},B),P)){var a={email:B.email.value,password:B.password.value};m(!0),k.userLogin(a).then((function(t){t.data.id;var a=t.data.username,c=t.headers["auth-token"];localStorage.setItem("accessToken",c),e.push("/user/".concat(a))})).catch((function(e){switch(e.response.status){case 401:P("Incorrect email or password")}})).finally((function(){m(!1)}))}}),[B]),Q=Object(c.useCallback)((function(t){if(R(""),t.preventDefault(),V(Object(T.a)({},H),R))if(H.password.value===H.passwordReEnter.value){w(!0);var a={email:H.email.value,username:H.username.value,name:H.name.value,password:H.password.value};k.createUser(a).then((function(t){var a=t.data.username,c=t.headers["auth-token"];localStorage.setItem("accessToken",c),e.push("/user/".concat(a))})).catch((function(e){if(console.log(e.response),e.response&&e.response.status)switch(e.response.status){case 409:R("Email taken");break;case 422:R("Username taken")}})).finally((function(){w(!1)}))}else R("Passwords must match")}),[H]),V=function(e,t){for(var a=Object.keys(e),c=0;c<a.length;c++){var s=a[c],n=e[s].value,r=e[s].helperText;if(!n)return t(r),!1}return!0};return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(I,{show:s}),Object(g.jsx)(N,{isLoginPage:!0,handleLoginInfo:function(){n(!1)}}),Object(g.jsx)("div",{children:Object(g.jsxs)("div",{className:"login-page-forms-wrapper",children:[Object(g.jsxs)("form",{className:"login-page-form".concat(l?"":" hide"),onSubmit:K,children:[Object(g.jsx)("h2",{children:"Login"}),Object(g.jsx)("div",{className:"helper-wrapper".concat(y?"":" hide"),children:y}),Object(g.jsx)("div",{className:"form-group",children:Object(g.jsx)("input",{className:"dark-input",id:"loginEmailInput",type:"email",onChange:z,name:"email",value:B.email.value,placeholder:"Email","aria-label":"email"})}),Object(g.jsx)("div",{className:"form-group",children:Object(g.jsx)("input",{className:"dark-input",id:"loginPasswordInput",type:"password",onChange:z,name:"password",value:B.password.value,placeholder:"Password","aria-label":"password"})}),Object(g.jsx)("div",{className:"submit-btn-wrapper",children:Object(g.jsxs)("button",{className:"blue-btn",disabled:h,children:["Login ",Object(g.jsx)("span",{children:Object(g.jsx)(j.a,{icon:x.c,className:"btn-load-spinner".concat(h?"":" hide")})})]})}),Object(g.jsxs)("p",{className:"login-display-change-text",children:["Don't have an account? ",Object(g.jsx)("span",{onClick:M,children:"Create an account"})]})]}),Object(g.jsxs)("form",{className:"login-page-form".concat(l?" hide":""),onSubmit:Q,children:[Object(g.jsx)("h2",{children:"Register"}),Object(g.jsx)("div",{className:"helper-wrapper".concat(E?"":" hide"),children:E}),Object(g.jsx)("div",{className:"form-group",children:Object(g.jsx)("input",{className:"dark-input",id:"registerEmailInput",type:"email",onChange:G,name:"email",value:H.email.value,placeholder:"Email","aria-label":"email"})}),Object(g.jsx)("div",{className:"form-group",children:Object(g.jsx)("input",{className:"dark-input",id:"registerUsernameInput",type:"text",onChange:G,name:"username",value:H.username.value,placeholder:"Username","aria-label":"username"})}),Object(g.jsx)("div",{className:"form-group",children:Object(g.jsx)("input",{className:"dark-input",id:"registerFullNameInput",type:"text",onChange:G,name:"name",value:H.name.value,placeholder:"Full Name","aria-label":"full name"})}),Object(g.jsx)("div",{className:"form-group",children:Object(g.jsx)("input",{className:"dark-input",id:"registerPasswordInput",type:"password",onChange:G,name:"password",value:H.password.value,placeholder:"Password","aria-label":"password"})}),Object(g.jsx)("div",{className:"form-group",children:Object(g.jsx)("input",{className:"dark-input",id:"registerPasswordReEnterInput",type:"password",onChange:G,name:"passwordReEnter",value:H.passwordReEnter.value,placeholder:"Re-Enter Password","aria-label":"re-enter password"})}),Object(g.jsx)("div",{className:"submit-btn-wrapper",children:Object(g.jsxs)("button",{className:"blue-btn",disabled:v,children:["Register ",Object(g.jsx)("span",{children:Object(g.jsx)(j.a,{icon:x.c,className:"btn-load-spinner".concat(v?"":" hide")})})]})}),Object(g.jsxs)("p",{className:"login-display-change-text",children:["Already have an account? ",Object(g.jsx)("span",{onClick:M,children:"Log in"})]})]})]})})]})}a(80);function E(e){var t=Object(i.f)(),a=Object(c.useRef)(),s=Object(c.useState)(!1),n=Object(u.a)(s,2),r=n[0],o=n[1],l=Object(c.useState)(""),d=Object(u.a)(l,2),b=d[0],p=d[1],h=Object(c.useState)(""),m=Object(u.a)(h,2),O=m[0],f=m[1],v=Object(c.useRef)(),N=Object(c.useState)(0),w=Object(u.a)(N,2),C=w[0],S=w[1],y=Object(c.useRef)();Object(c.useEffect)((function(){}),[]);var P=Object(c.useCallback)((function(){if(p(""),!O)return p("Please choose an image to post");o(!0),k.uploadToCloudinary(O).then((function(e){k.createPost({img:e.data.url,caption:v.current.value}).then((function(e){t.go(0)})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e.response)})).finally((function(){return o(!1)}))}),[O]),I=Object(c.useCallback)((function(){var e=v.current.value;S(e.length)}),[C]);return Object(g.jsx)(g.Fragment,{children:Object(g.jsxs)("div",{className:"new-post-modal-wrapper-outer".concat(e.show?"":" hide"),children:[Object(g.jsxs)("div",{className:"new-post-modal-wrapper-inner",children:[Object(g.jsx)("h2",{children:"New Post"}),Object(g.jsx)("button",{className:"exit-btn",onClick:function(){e.setShow(!1),document.querySelector(".header-search-wrapper").style.opacity=1},disabled:r,children:Object(g.jsx)("span",{children:"\xd7"})}),Object(g.jsx)("div",{className:"helper-wrapper".concat(b?"":" hide"),children:b}),Object(g.jsx)("div",{className:"img-aspect-ratio-wrapper",children:Object(g.jsx)("div",{className:"img-wrapper",children:O?Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("img",{src:O,alt:"Image to post"}),Object(g.jsx)("div",{className:"btn-wrapper",children:Object(g.jsx)("button",{className:"dark-btn",onClick:function(){return y.current.click()},children:"Change Image"})})]}):Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("h3",{onClick:function(){return y.current.click()},children:"Upload Image"}),Object(g.jsxs)("svg",{onClick:function(){return y.current.click()},ref:a,id:"Layer_1","data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 97.75 48.75",children:[Object(g.jsx)("defs",{}),Object(g.jsx)("rect",{className:"cls-1",x:"0.38",y:"0.38",width:"97",height:"48",rx:"3.89"})]})]})})}),Object(g.jsxs)("div",{className:"caption-wrapper",children:[Object(g.jsx)("textarea",{ref:v,placeholder:"Caption",maxLength:"300",onChange:I}),Object(g.jsxs)("small",{className:"text-count",children:[C,"/300"]})]}),Object(g.jsx)("div",{className:"post-btn-wrapper",children:Object(g.jsxs)("button",{className:"blue-btn create-post-btn",onClick:P,disabled:r,children:["Post ",Object(g.jsx)("span",{children:Object(g.jsx)(j.a,{icon:x.c,className:"btn-load-spinner".concat(r?"":" hide")})})]})})]}),Object(g.jsx)("input",{ref:y,onChange:function(e){var t=e.target.files[0],a=new FileReader;a.onload=function(e){return f(e.target.result)},a.readAsDataURL(t)},className:"hide",type:"file"})]})})}a(81);function R(){var e=Object(i.f)(),t=Object(i.h)().username,a=Object(c.useState)({username:"",name:"",profileImg:"",bio:"",followersCount:0,followingCount:0}),s=Object(u.a)(a,2),n=s[0],r=s[1],o=Object(c.useState)(!1),l=Object(u.a)(o,2),d=l[0],b=l[1],p=Object(c.useState)(!1),h=Object(u.a)(p,2),m=h[0],O=h[1],f=Object(c.useState)(!1),v=Object(u.a)(f,2),w=v[0],C=v[1],y=Object(c.useState)([]),P=Object(u.a)(y,2),L=P[0],U=P[1],T=Object(c.useState)(!1),F=Object(u.a)(T,2),R=F[0],_=F[1],D=Object(c.useState)(!1),B=Object(u.a)(D,2),A=B[0],q=B[1],Y=Object(c.useState)(!1),H=Object(u.a)(Y,2),J=H[0],M=H[1],z=Object(c.useState)(!1),G=Object(u.a)(z,2),K=(G[0],G[1],Object(c.useCallback)((function(){O(!0),k.followUser(n.id).then((function(t){e.go(0)})).catch((function(e){console.log(e.response)})).finally((function(){return O(!1)}))}),[n.id])),Q=Object(c.useCallback)((function(){C(!0),k.unfollowUser(n.id).then((function(t){e.go(0)})).catch((function(e){console.log(e.response)})).finally((function(){C(!1)}))}),[n.id]),V=function(){M(!0),document.querySelector(".header-search-wrapper").style.opacity=0},W=function(){localStorage.removeItem("accessToken"),e.push("/login")};return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(I,{show:!d}),Object(g.jsx)(E,{setShow:M,show:J}),Object(g.jsx)(N,{handleTokenInfo:function(a){var c=a.username;k.getUser(t,c).then((function(e){var t=e.data;console.log("userobj",t),q(t.isFollowing||!1),t.isFollowing&&delete t.isFollowing,r(t),k.getUserPosts(t.id).then((function(e){U(e.data)}))})).catch((function(t){e.push("/")})).finally((function(){b(!0)})),c===t&&_(!0)}}),Object(g.jsx)("div",{className:"content-header-footer-offset",children:Object(g.jsxs)("div",{className:"content-main-responsive",children:[Object(g.jsxs)("div",{className:"profile-info-wrapper",children:[Object(g.jsx)("h1",{children:n.username}),Object(g.jsxs)("div",{className:"row top",children:[Object(g.jsx)("div",{className:"flex-group left",children:Object(g.jsx)("div",{className:"profile-img-wrapper",children:Object(g.jsx)("img",{src:n.profileImg||"https://i.imgur.com/dCc7ake.png",alt:"user profile picture"})})}),Object(g.jsxs)("div",{className:"flex-group right",children:[Object(g.jsxs)("div",{className:"follows-wrapper",children:[Object(g.jsxs)("div",{className:"followers",children:[Object(g.jsx)("p",{className:"followers-count",children:n.followersCount}),Object(g.jsx)("p",{children:"Followers"})]}),Object(g.jsxs)("div",{className:"following",children:[Object(g.jsx)("p",{className:"following-count",children:n.followingCount}),Object(g.jsx)("p",{children:"Following"})]})]}),Object(g.jsx)("div",{className:"profile-option-btns-wrapper",children:R?Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("button",{className:"blue-btn",onClick:function(){return e.push("/user/edit/".concat(n.username))},children:"Edit Profile"}),Object(g.jsx)("button",{className:"blue-btn",onClick:W,children:"Logout"})]}):A?Object(g.jsxs)("button",{className:"blue-btn",onClick:Q,disabled:w,children:["Unfollow ",Object(g.jsx)("span",{children:Object(g.jsx)(j.a,{icon:x.c,className:"btn-load-spinner".concat(w?"":" hide")})})]}):Object(g.jsxs)("button",{className:"blue-btn",onClick:K,disabled:m,children:["Follow ",Object(g.jsx)("span",{children:Object(g.jsx)(j.a,{icon:x.c,className:"btn-load-spinner".concat(m?"":" hide")})})]})})]})]}),Object(g.jsxs)("div",{className:"row bottom",children:[Object(g.jsx)("div",{className:"user-name-wrapper",children:n.name}),Object(g.jsx)("div",{className:"profile-option-btns-wrapper mobile",children:R?Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("button",{className:"blue-btn",onClick:function(){return e.push("/user/edit/".concat(n.username))},children:"Edit Profile"}),Object(g.jsx)("button",{className:"blue-btn",onClick:W,children:"Logout"})]}):A?Object(g.jsxs)("button",{className:"blue-btn",onClick:Q,disabled:w,children:["Unfollow ",Object(g.jsx)("span",{children:Object(g.jsx)(j.a,{icon:x.c,className:"btn-load-spinner".concat(w?"":" hide")})})]}):Object(g.jsxs)("button",{className:"blue-btn",onClick:K,disabled:m,children:["Follow ",Object(g.jsx)("span",{children:Object(g.jsx)(j.a,{icon:x.c,className:"btn-load-spinner".concat(m?"":" hide")})})]})}),Object(g.jsx)("p",{className:"profile-bio",children:n.bio||""})]})]}),Object(g.jsxs)("div",{className:"profile-posts-wrapper",children:[R&&L.length>0?Object(g.jsx)("div",{className:"profile-post-thumb new-post-btn",onClick:V,children:Object(g.jsxs)("svg",{id:"Layer_1","data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 62.75 62.75",children:[Object(g.jsx)("defs",{children:Object(g.jsx)("style",{})}),Object(g.jsx)("circle",{class:"cls-1",cx:"31.38",cy:"31.38",r:"31"}),Object(g.jsx)("line",{className:"cls-2",x1:"31.38",y1:"20.38",x2:"31.38",y2:"42.37"}),Object(g.jsx)("line",{className:"cls-2",x1:"42.37",y1:"31.38",x2:"20.38",y2:"31.38"})]})}):R?Object(g.jsx)("button",{className:"first-post-btn dark-btn",onClick:V,children:"Create Your First Post"}):Object(g.jsx)("div",{className:"no-posts-display",children:"User has not posted yet"}),L.map((function(t,a){var c,s=(c=a+1,R&&c++,c%3===0?3:(c-2)%3===0?2:(c-1)%3===0?1:void 0);return Object(g.jsx)("div",{className:"profile-post-thumb".concat(1===s?" first-col":"").concat(3===s?" third-col":""),onClick:function(){return e.push("/post/".concat(t._id))},children:Object(g.jsx)("img",{src:t.img,alt:"thumbnail of post"})})}))]})]})}),Object(g.jsx)(S,{})]})}a(82);function _(){var e=Object(i.f)(),t=Object(c.useState)(!1),a=Object(u.a)(t,2),s=a[0],n=a[1],r=Object(i.h)().username,o=Object(c.useRef)(),l=Object(c.useState)(""),d=Object(u.a)(l,2),b=d[0],p=d[1],h=Object(c.useState)(""),m=Object(u.a)(h,2),O=m[0],f=m[1],v=Object(c.useState)({email:"",username:"",name:"",bio:"",profilePicture:""}),w=Object(u.a)(v,2),C=w[0],y=w[1],P=Object(c.useRef)(!1),L=Object(c.useState)(!1),F=Object(u.a)(L,2),E=F[0],R=F[1];Object(c.useEffect)((function(){console.log(r),k.getUser(r).then((function(e){console.log(e.data),y(Object(T.a)(Object(T.a)({},e.data),{},{profilePicture:e.data.profileImg})),f(e.data.username)})).finally((function(){n(!0)}))}),[]);var _=function(e){var t=e.target.name,a=e.target.value;y(Object(T.a)(Object(T.a)({},C),{},Object(U.a)({},t,a)))},D=Object(c.useCallback)((function(e){return e.preventDefault(),C.email?C.username?(R(!0),void(P.current?k.uploadProfilePic(C.profilePicture).then((function(e){console.log(e.data),B(e.data.url)})).catch((function(e){console.log(e.response),alert("An error occurred while uploading profile picture"),R(!1)})):B(null))):p("Username can not be blank"):p("Email can not be blank")}),[C]),B=function(t){k.userUpdate(Object(T.a)(Object(T.a)({},C),{},{profilePicture:t||C.profilePicture})).then((function(t){console.log(t.data),localStorage.setItem("accessToken",t.headers["auth-token"]),e.push("/user/".concat(t.data.username))})).catch((function(t){if(console.log(t.response),t.response.status)switch(t.response.status){case 409:p("Email Taken");break;case 422:p("Username Taken");break;case 401:case 403:e.push("/login")}})).finally((function(){R(!1)}))};return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(I,{show:!s}),Object(g.jsx)(N,{}),Object(g.jsxs)("div",{className:"content-header-footer-offset edit-profile-content-wrapper",children:[Object(g.jsx)("h1",{children:O}),Object(g.jsxs)("form",{className:"edit-profile-form",children:[Object(g.jsx)("div",{className:"helper-wrapper".concat(b?"":" hide"),children:b}),Object(g.jsxs)("div",{className:"profile-pic",children:[Object(g.jsx)("div",{className:"img-wrapper",children:Object(g.jsx)("img",{src:C.profilePicture||"https://i.imgur.com/dCc7ake.png",alt:"profile picture"})}),Object(g.jsx)("button",{className:"dark-btn",onClick:function(e){e.preventDefault(),o.current.click()},disabled:E,children:"Change Image"}),Object(g.jsx)("input",{ref:o,className:"hide",type:"file",onChange:function(e){var t=e.target.files[0],a=new FileReader;a.onload=function(e){return y(Object(T.a)(Object(T.a)({},C),{},{profilePicture:e.target.result}))},a.readAsDataURL(t),P.current=!0}})]}),Object(g.jsx)("label",{for:"edit-profile-username",children:"Username"}),Object(g.jsx)("input",{className:"dark-input",id:"edit-profile-username",type:"text",placeholder:"Username",name:"username",value:C.username,onChange:_}),Object(g.jsx)("label",{for:"edit-profile-name",children:"Name"}),Object(g.jsx)("input",{id:"edit-profile-name",className:"dark-input",type:"text",placeholder:"Name",name:"name",value:C.name,onChange:_}),Object(g.jsx)("label",{for:"edit-profile-email",children:"Email"}),Object(g.jsx)("input",{className:"dark-input",id:"edit-profile-email",type:"email",placeholder:"Email",name:"email",value:C.email,onChange:_}),Object(g.jsx)("label",{for:"edit-profile-bio",children:"Bio"}),Object(g.jsx)("textarea",{id:"edit-profile-bio",className:"dark-input",name:"bio",value:C.bio,placeholder:"Bio",maxLength:"300",onChange:_}),Object(g.jsxs)("small",{children:[C.bio?C.bio.length:0,"/300"]}),Object(g.jsx)("div",{className:"btn-wrapper",children:Object(g.jsxs)("button",{className:"blue-btn",onClick:D,disabled:E,children:["Save Changes ",Object(g.jsx)(j.a,{icon:x.c,className:"btn-load-spinner".concat(E?"":" hide")})]})})]})]}),Object(g.jsx)(S,{})]})}function D(){var e=Object(i.f)(),t=Object(i.h)().id,a=Object(c.useState)(!1),s=Object(u.a)(a,2),n=s[0],r=s[1],o=Object(c.useState)(null),l=Object(u.a)(o,2),j=l[0],d=l[1],b=Object(c.useState)(null),p=Object(u.a)(b,2),h=p[0],m=p[1];return Object(c.useEffect)((function(){k.getPost(t).then((function(e){var t=e.data.post,a=e.data.user;t.likedBy.includes(a.id)?(console.log("has liked"),t.hasLiked=!0):(console.log("has not liked"),t.hasLiked=!1),d(t),m(a)})).catch((function(t){if(console.log(t.response),t.response.status)switch(t.response.status){case 401:case 403:alert("Session has timed out"),e.push("/login")}})).finally((function(){r(!0)}))}),[]),Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(I,{show:!n}),Object(g.jsx)(N,{}),Object(g.jsx)("div",{className:"content-header-footer-offset",children:Object(g.jsx)("div",{className:"content-main-responsive",children:j?Object(g.jsx)(P,{post:j,user:j.creator,loggedInUser:h,isPostPage:!0}):""})}),Object(g.jsx)(S,{})]})}a(83);function B(){var e=Object(i.f)(),t=Object(c.useState)(!1),a=Object(u.a)(t,2),s=a[0],n=a[1],r=Object(c.useState)(),o=Object(u.a)(r,2),l=o[0],d=o[1],p=Object(c.useState)(!1),h=Object(u.a)(p,2),m=h[0],O=h[1],f=Object(c.useState)(null),x=Object(u.a)(f,2),v=x[0],w=x[1],C=Object(c.useCallback)((function(e){e.preventDefault(),O(!0),k.getSearchResults(l).then((function(e){w(e.data),console.log(e.data)})).catch((function(e){console.log(e.response)})).finally((function(){O(!1)}))}),[l]);return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(I,{show:!s}),Object(g.jsx)(N,{handleTokenInfo:function(){n(!0)}}),Object(g.jsx)("div",{className:"content-header-footer-offset",children:Object(g.jsxs)("div",{className:"content-main-responsive search-page",children:[Object(g.jsxs)("form",{className:"search-form",onSubmit:C,children:[Object(g.jsx)("input",{className:"dark-input",type:"text",name:"user",placeholder:"Search",value:l,onChange:function(e){var t=e.target.value;d(t)}}),Object(g.jsx)(j.a,{icon:b.b,className:"search-icon",onClick:C})]}),Object(g.jsx)("div",{className:"results",children:v?v.map((function(t){return Object(g.jsxs)("div",{className:"user",children:[Object(g.jsx)("div",{className:"profile-img",onClick:function(){return e.push("/user/".concat(t.username))},children:Object(g.jsx)("img",{src:t.profilePicture||"https://i.imgur.com/dCc7ake.png",alt:"profile picture"})}),Object(g.jsx)("p",{className:"username",onClick:function(){return e.push("/user/".concat(t.username))},children:t.username})]})})):m?Object(g.jsx)(j.a,{icon:b.c,className:"results-spinner"}):""})]})}),Object(g.jsx)(S,{})]})}var A=function(){return Object(g.jsx)("div",{className:"App",children:Object(g.jsx)(o.a,{basename:"/social-media-app",children:Object(g.jsxs)(i.c,{children:[Object(g.jsx)(i.a,{exact:!0,path:"/",children:Object(g.jsx)(L,{})}),Object(g.jsx)(i.a,{exact:!0,path:"/login",children:Object(g.jsx)(F,{})}),Object(g.jsx)(i.a,{exact:!0,path:"/user/:username",children:Object(g.jsx)(R,{})}),Object(g.jsx)(i.a,{exact:!0,path:"/user/edit/:username",children:Object(g.jsx)(_,{})}),Object(g.jsx)(i.a,{exact:!0,path:"/post/:id",children:Object(g.jsx)(D,{})}),Object(g.jsx)(i.a,{exact:!0,path:"/search",children:Object(g.jsx)(B,{})})]})})})},q=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,85)).then((function(t){var a=t.getCLS,c=t.getFID,s=t.getFCP,n=t.getLCP,r=t.getTTFB;a(e),c(e),s(e),n(e),r(e)}))};r.a.render(Object(g.jsx)(s.a.StrictMode,{children:Object(g.jsx)(A,{})}),document.getElementById("root")),q()}},[[84,1,2]]]);
//# sourceMappingURL=main.b145b7f4.chunk.js.map