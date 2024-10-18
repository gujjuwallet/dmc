import{r as l,j as e,C as n,L as x,B as r,Q as p,n as i}from"./index-DeE3vtCn.js";import{g as y,d as g}from"./api-BHjxf7no.js";import{T as v}from"./Table-DF0PIz40.js";const A=()=>{const[o,a]=l.useState([]),[j,d]=l.useState(!0),[c,h]=l.useState(null);l.useEffect(()=>{(async()=>{try{const t=await y();a(t),console.log(t),d(!1)}catch{h("Failed to fetch hotels"),d(!1)}})()},[]);const m=s=>{i.info(e.jsxs(e.Fragment,{children:[e.jsx("div",{children:"Are you sure you want to delete this hotel?"}),e.jsxs("div",{children:[e.jsx(r,{variant:"danger",size:"sm",onClick:()=>u(s),children:"Yes"}),e.jsx(r,{variant:"secondary",size:"sm",style:{marginLeft:"10px"},onClick:()=>i.dismiss(),children:"No"})]})]}),{position:"top-center",autoClose:!1,closeOnClick:!1,hideProgressBar:!0})},u=async s=>{try{await g(s),a(o.filter(t=>t._id!==s)),i.success("Hotel deleted successfully!",{position:"top-right",autoClose:2e3}),i.dismiss()}catch{h("Failed to delete hotel"),i.error("Failed to delete hotel. Please try again.",{position:"top-right",autoClose:3e3}),i.dismiss()}};return j?e.jsx("p",{children:"Loading hotels..."}):c?e.jsx("p",{children:c}):e.jsxs(n,{children:[e.jsxs(n.Header,{children:[e.jsx(n.Title,{as:"h5",children:"Hotel List"}),e.jsx(x,{to:"/hotels/add-hotel",children:e.jsx(r,{variant:"primary",children:"Add Hotel"})})]}),e.jsx(n.Body,{children:e.jsxs(v,{responsive:!0,hover:!0,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Name"}),e.jsx("th",{children:"Location"}),e.jsx("th",{children:"Contact"}),e.jsx("th",{children:"Amenities"}),e.jsx("th",{children:"Room"}),e.jsx("th",{children:"Availability"}),e.jsx("th",{children:"Actions"})]})}),e.jsx("tbody",{children:o.map(s=>e.jsxs("tr",{children:[e.jsx("td",{children:s.name}),e.jsx("td",{children:s.location}),e.jsx("td",{children:s.contact}),e.jsx("td",{children:s.amenities.join(", ")}),e.jsx("td",{children:s.rooms.map((t,f)=>e.jsxs("div",{children:[t.roomType," - Rate: ",t.rate]},f))}),e.jsx("td",{children:e.jsx("h6",{children:s.availability?"Available":"Not Available"})}),e.jsxs("td",{children:[e.jsx(x,{to:`/hotels/edit-hotel/${s._id}`,children:e.jsx(r,{variant:"warning",children:"Edit"})})," ",e.jsx(r,{variant:"danger",onClick:()=>m(s._id),children:"Delete"})]})]},s._id))})]})}),e.jsx(p,{})]})};export{A as default};
