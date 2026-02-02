const notesContainer=document.getElementById("app");
const addNoteButton=notesContainer.querySelector(".add-note");

getnotes().forEach(note=>{
    const noteElement=createnoteElement(note.id,note.content);
    notesContainer.insertBefore(noteElement,addNoteButton);
});
addNoteButton.addEventListener("click",()=>addNote());
function getnotes(){
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}
function savenotes(notes){
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}
function createnoteElement(id, content){
    const element=document.createElement("textarea");
    element.classList.add("note");
    element.value=content;
    element.placeholder="Empty Sticky Note";

    element.addEventListener("change",()=>{
        updatenote(id,element.value);
    });
    element.addEventListener("dblclick",()=>{
        const doDelete=confirm("Udaa doo?");
        if (doDelete){
            deletenote(id,element);
        }
    });
    return element;
}
function addNote(){
    const existingNotes=getnotes();
    const noteObject={
        id :Math.floor(Math.random()*100000),
        content: ""
    };
    const noteElement=createnoteElement(noteObject.id,noteObject.content);
    notesContainer.insertBefore(noteElement,addNoteButton);
    existingNotes.push(noteObject);
    savenotes(existingNotes);
}
function updatenote(id, newContent){
    const notes=getnotes();
    const targetNote=notes.filter(note=>note.id==id)[0];
    targetNote.content=newContent;
    savenotes(notes);
}
function deletenote(id, element){
    const notes=getnotes().filter(note=>note.id!=id);
    savenotes(notes);
    notesContainer.removeChild(element);
}