import IdeasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";

class IdeaForm {
  constructor () {
    this._formModal = document.querySelector('#form-modal');
    this._ideaList = new IdeaList();
  }

  addEventListeners () {
    this._form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit (e) {
    e.preventDefault();
    if (!this._form.elements.text.value || !this._form.elements.username.value || !this._form.elements.tag.value) {
      alert('Please fill in all fields');
      return;
    }
    localStorage.setItem('username', this._form.elements.username.value);
    const idea = {
      text: this._form.elements.text.value,
      username: this._form.elements.username.value,
      tag: this._form.elements.tag.value
    }
    const newIdea = await IdeasApi.createIdea(idea);
    this._ideaList.addIdeaToList(newIdea.data.data);
    this._form.elements.text.value = '';
    this._form.elements.username.value = '';
    this._form.elements.tag.value = '';
    this.render()

    document.dispatchEvent(new Event('closemodal'));
  }

  render () {
    this._formModal.innerHTML = `
      <form id="idea-form">
        <div class="form-control">
          <label for="idea-text">Enter a Username</label>
          <input type="text" name="username" id="username" value="${localStorage.getItem('username') ? localStorage.getItem('username') : ''}" />
        </div>
        <div class="form-control">
          <label for="idea-text">What's Your Idea?</label>
          <textarea name="text" id="idea-text"></textarea>
        </div>
        <div class="form-control">
          <label for="tag">Tag</label>
          <input type="text" name="tag" id="tag" />
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
      </form>
    `;
    this._form = document.querySelector('#idea-form');
    this.addEventListeners();
  }
}

export default IdeaForm;