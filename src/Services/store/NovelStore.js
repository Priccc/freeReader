import qs from 'qs';
import Config from 'react-native-config';
import { observable, action, autorun } from 'mobx';
import storage from '../storage';
import logger from '../logger';
import api from '../api';

class NovelStore {
  @observable novelList = {};
  @observable novelDirectoryList = {};
  @observable currentNovel = null;
  @observable progress = 0;
  @observable totalPage = 0;
  @observable prevChapter = null;
  @observable currentChapter = null;
  @observable nextChapter = null;

  @action async getNovelList(uid) {
    await api.get(`/novel/list?uid=${uid}`)
      .then(({ data }) => {
        if (data.status === 200) {
          this.novelList = data.data;
        } else {
          logger.error(new Error('Failed to pull the information list!!'));
        }
      }).catch(e => new Error(`Failed to pull the information list!!:${e}`));
  }

  @action async getNovelDirectory() {
    await api.get(`/novel/directory?nid=${this.currentNovel.id}`)
      .then(({ data }) => {
        if (data.status === 200) {
          this.novelDirectoryList = data.data;
        }
      }).catch(e => new Error(`Failed to retrieve directory information!!:${e}`));
  }

  @action async getServiceProgress() {
    await api.get(`/novel/progress?nid=${this.currentNovel.id}`)
      .then(({ data }) => {
        if (data.status) {
          this.progress = data.data.progress;
        }
      }).catch(e => new Error(`Failed to retrieve progress information!!:${e}`));
  }

  @action async setServiceProgress() {
    if (!this.currentNovel) {
      return;
    }
    await api.get(`/novel/progress?nid=${this.currentNovel.id}&num=${this.progress}`);
  }

  @action async getChapterContent() {
    if (!this.currentNovel) {
      return;
    }
    await api.get(`/chapter?nid=${this.currentNovel.id}&num=${this.progress}`)
      .then(({ data }) => {
        if (data.status === 200) {
          this.currentChapter = data.data;
        }
      }).catch(e => new Error(`Failed to retrieve chapter information!!:${e}`));
  }

  @action setCurrentNovel(novel) {
    this.currentNovel = novel;
    this.progress = 0;
    this.currentChapter = null;
  }

  @action setProgress(progress) {
    this.progress = progress;
  }

  @action setTotalPage(totalPage) {
    this.totalPage = totalPage;
  }
}

const store = new NovelStore();

// auto matical persistant
const disposer = autorun(async () => {
  const { progress } = store;

  await store.setServiceProgress();
  await store.getChapterContent();
});

disposer.onError((err) => {
  logger.warn('NovelStore.persist.error', err);
});

module.exports = store;
