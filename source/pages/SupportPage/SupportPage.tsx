import * as React from 'react';

import {PageWrapper} from 'common-components/PageWRapper/PageWrapper';

import {getUniqKey} from 'common-helper-functions/getUniqKey';

const s: {[props: string]: string} = require('./SupportPage.css');


interface ISupportPage {
  attachments: string[]
}

export class SupportPage extends React.Component<null, ISupportPage> {
  state: ISupportPage = {
    attachments: []
  }

  handleFileLoad = (e: any) => {
    const files = e.target.files;
    const urls: string[] = [];
    Array.prototype.forEach.call(files, (file: File) => {
      const url = window.URL.createObjectURL(file);
      urls.push(url);
    });
    this.setState({attachments: urls});
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    alert('Form submited');
  }

  render() {
    return (
      <PageWrapper>
        <div className={s.wrapper}>
          <h2 className={s.title}>Request</h2>
          <form onSubmit={this.handleSubmit}>
            <div className={s.row}>
              <div className={s.leftCol}>
                <div className={s.inputField}>
                  <label>
                    <span className={s.labelText}>Name</span>
                    <input className={s.nameInput} name='name' />
                  </label>
                </div>
                <div className={s.inputField}>
                  <label>
                    <span className={s.labelText}>Description</span>
                    <textarea className={s.descriptionInput} name='description' />
                  </label>
                </div>
              </div>
              <div className={s.rightCol}>
                <div className={s.fileLoader}>
                  <label>
                    <input onChange={this.handleFileLoad} accept='image/*' multiple={true} hidden={true} type='file' />
                    <div className={s.fileLoaderLabelIcon} />
                    <div className={s.fileLoaderLabelText}>Add attachements</div>
                  </label>
                  {
                    this.state.attachments.length ?
                      <div className={s.attachments}>
                        {this.state.attachments.map(attachment =>
                          <div style={{backgroundImage: `url(${attachment})`}} className={s.attachment} key={getUniqKey()} />
                        )}
                      </div> :
                      <div className={s.noAttachmentsNotification}>No appachments selected</div>
                  }
                </div>
              </div>
            </div>
          </form>
        </div>
      </PageWrapper>
    );
  }
}