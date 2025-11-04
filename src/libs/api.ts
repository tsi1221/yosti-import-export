const API = import.meta.env.VITE_API_URL;

export async function fetchSource(){
  const res=await fetch(${API}/students);
  if(!res.ok)throw new Error("Failed to fetch");
  return res.json();
}

export async function createaccount(data){
  const res=await fetch(${API}/students,{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify(data)});
  return res.json();
}
export async function updateSupport(id,data){
  const res=await fetch(${API}/students/${id},{
    method:"PUT",headers:{"Content-Type":"application/json"},
    body:JSON.stringify(data)});
  return res.json();
}
export async function deleteStudent(id){
  await fetch(${API}/students/${id},{method:"DELETE"});
}