/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
<<<<<<< HEAD:src/components/alerts/alert/notifications/alert-notifications.ts
import {DurationTimeUnit} from '../../../../entities/alert';
=======
>>>>>>> b344cf20dec4bd6f6c95a71a1a8a55969baa43e0:src/management/components/alerts/alert/notifications/alert-notifications.ts

const AlertNotificationsComponent: ng.IComponentOptions = {
  bindings: {
    alert: '<'
  },
  require: {
    parent: '^alertComponent'
  },
  template: require('./alert-notifications.html'),
  controller: function() {
    'ngInject';

    this.addNotification = () => {
      if (this.alert.notifications === undefined) {
        this.alert.notifications = [];
      }

      this.alert.notifications.push({});
    };

    this.removeNotification = (idx: number) => {
      this.alert.notifications.splice(idx, 1);
      this.parent.formAlert.$setDirty();
    };
  }
};

export default AlertNotificationsComponent;
