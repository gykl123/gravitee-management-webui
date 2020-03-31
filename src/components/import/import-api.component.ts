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
import { StateService } from '@uirouter/core';
import { IScope } from 'angular';

import NotificationService from '../../../services/notification.service';
import _ = require('lodash');
import ApiService from '../../../services/api.service';


const ImportComponent: ng.IComponentOptions = {
  template: require('./import-api.html'),
  bindings: {
    apiId: '<',
    cancelAction: '&',
    policies: '<'
  },
  controller: function(
    $state: StateService,
    $scope: IScope,
    $mdDialog: angular.material.IDialogService,
    NotificationService: NotificationService,
    ApiService: ApiService
  ) {

    'ngInject';

    this.$onInit = () => {
      var that = this;
      this.importFileMode = true;
      this.importURLMode = false;
      this.enableFileImport = false;
      this.importFileMode = true;
      this.importURLMode = false;
      this.importURLTypes = [
        { id: 'SWAGGER', name: 'Swagger / OpenAPI' },
        { id: 'GRAVITEE', name: 'API Definition' }
      ];
      this.importURLType = 'SWAGGER';
      this.apiDescriptorURL = null;
      this.importAPIFile = null;
      this.importCreateDocumentation = true;
      this.importCreatePolicyPaths = false;
      this.importCreatePathMapping = true;
      this.importCreateMocks = false;
      $scope.$watch('$ctrl.importAPIFile.content', function(data) {
        if (data) {
          that.enableFileImport = true;
        }
      });
    };

    this.placeholder = () => {
      if (this.importURLType === 'SWAGGER') {
        return 'Enter Swagger descriptor URL';
      } else if (this.importURLType === 'GRAVITEE') {
        return 'Enter API definition URL';
      }
    };

    this.cancel = () => {
      this.cancelAction();
    };

    this.isSwaggerImport = () => {
      if (this.importURLMode && this.importURLType === 'SWAGGER') {
        return true;
      }

      if (this.importFileMode && this.importAPIFile) {
        var extension = this.importAPIFile.name.split('.').pop();
        switch (extension) {
          case 'yml' :
          case 'yaml' :
            return true;
          case 'json' :
            if (this.isSwaggerDescriptor()) {
              return true;
            }
            break;
          default:
            return false;
        }
      }
      return false;
    };

    this.isForUpdate = () => {
      return this.apiId != null;
    };

    this.isSwaggerDescriptor = () => {
      try {
        if (this.enableFileImport) {
          var fileContent = JSON.parse(this.importAPIFile.content);
          return fileContent.hasOwnProperty('swagger')
            || fileContent.hasOwnProperty('swaggerVersion')
            || fileContent.hasOwnProperty('openapi');
        }
      } catch (e) {
        NotificationService.showError('Invalid json file.');
        this.enableFileImport = false;
      }
    };

    this.enableImport = () => {
      if (this.importFileMode) {
        return this.enableFileImport;
      } else {
        return (this.apiDescriptorURL && this.apiDescriptorURL.length);
      }
    };

    this.importAPI = () => {
      if (this.importFileMode) {
        var extension = this.importAPIFile.name.split('.').pop();
        switch (extension) {
          case 'yml' :
          case 'yaml' :
            this.importSwagger();
            break;
          case 'json' :
            let isSwagger = this.isSwaggerDescriptor();
            if (isSwagger !== null) {
              if (isSwagger) {
                this.importSwagger();
              } else {
                this.importGraviteeIODefinition();
              }
            }
            break;
          default:
            this.enableFileImport = false;
            NotificationService.showError('Input file must be a valid API definition file.');
        }
      } else if (this.importURLType === 'SWAGGER') {
        this.importSwagger();
      } else if (this.importURLType === 'GRAVITEE') {
        this.importGraviteeIODefinition();
      }
      if (this.isForUpdate()) {
        this.cancel();
      }
<<<<<<< HEAD:src/components/import/import-api.component.ts
    };
=======
    }
>>>>>>> b344cf20dec4bd6f6c95a71a1a8a55969baa43e0:src/management/components/import/import-api.component.ts

    this.importGraviteeIODefinition = () => {
      var id = (this.isForUpdate() ? this.apiId : null);
      var apiDefinition = (this.importFileMode ? this.importAPIFile.content : this.apiDescriptorURL);
      var isUpdate = this.isForUpdate();
      ApiService.import(id, apiDefinition).then(function(api) {
        NotificationService.show('API updated');
        if (isUpdate) {
          $state.reload();
        } else {
          $state.go('management.apis.detail.portal.general', { apiId: api.data.id });
        }
      });
    };

    this.importSwagger = () => {
      let type = 'URL';
      let payload = this.apiDescriptorURL;
      if (this.importFileMode) {
        type = 'INLINE';
        payload = this.importAPIFile.content;
      }

<<<<<<< HEAD:src/components/import/import-api.component.ts
=======
    this.importSwagger = () => {
>>>>>>> b344cf20dec4bd6f6c95a71a1a8a55969baa43e0:src/management/components/import/import-api.component.ts
      let swagger = {
        with_documentation: this.importCreateDocumentation,
        with_path_mapping: this.importCreatePathMapping,
        with_policy_paths: this.importCreatePolicyPaths,
<<<<<<< HEAD:src/components/import/import-api.component.ts
        with_policy_mocks: this.importCreateMocks,
        type,
        payload
      };

      if (this.isForUpdate()) {
        // @ts-ignore
=======
        with_policies: _.map(_.filter(this.policies, 'enable'), 'id')
      };

      if (this.importFileMode) {
        swagger.type = 'INLINE';
        swagger.payload = this.importAPIFile.content;
      } else {
        swagger.type = 'URL';
        swagger.payload = this.apiDescriptorURL;
      }

      if(this.isForUpdate()) {
>>>>>>> b344cf20dec4bd6f6c95a71a1a8a55969baa43e0:src/management/components/import/import-api.component.ts
        ApiService.importSwagger(this.apiId, swagger).then((api) => {
          NotificationService.show('API successfully imported');
          $state.reload();
        });
      } else {
        // @ts-ignore
        ApiService.importSwagger(null, swagger).then((api) => {
          NotificationService.show('API successfully updated');
          $state.go('management.apis.detail.portal.general', { apiId: api.data.id });
        });
      }
    };
  }
};

export default ImportComponent;
