import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: [ './pets.component.css' ]
})
export class PetsComponent implements OnInit {

  // tslint:disable-next-line
  private updateComment = gql`mutation createPet($name: String!) 
{ createPet( name: $name, species: { speciesName: "dog", speciesFamily: "horse", speciesType: BIRD }, age: 8,owner: "5a85393458f4201d3275c111")
{ _id first_name pets { name age } account { _id amount } chirps { _id text } __typename } }
`;

  result$: Observable<any>;

  constructor(private apollo: Apollo, private httpClient: HttpClient) {}

  ngOnInit() {
  }

  createPet() {

    const pet = {
      name: 'Macka1',
      age: 1
    };

    this.result$ = this.apollo.mutate({
      variables: { name: pet.name },
      mutation: this.updateComment,
      optimisticResponse: {
        __typename: 'Mutation',
        createPet: {
          __typename: 'Pet',
          name: pet.name,
          age: pet.age
        },
      },
    });
  }

  getOwnerById(ownerId?: string) {

    this.result$ = this.apollo.query({
      query: gql`{ getOwnerById(_id: "${ownerId}") { first_name last_name mobile email account { amount } } }`,
      errorPolicy: 'all'
    });
  }

  async uploadFile(files) {
    const uploadName = 'upload';
    const variables = { files: uploadName };
    const [ file ] = files;
    const UPLOAD_PROFILE_PICTURE = `mutation uploadProfilePicture($files: [Upload!]!) {uploadProfilePicture(fileNames: $files, id: 0)}`;
    const formData = new FormData();

    formData.append('query', UPLOAD_PROFILE_PICTURE);
    formData.append('variables', JSON.stringify(variables));
    formData.append('operationName', 'uploadProfilePicture');
    formData.append('debugName', '');
    formData.append(uploadName, file, file.name);

    this.result$ = this.httpClient.post('http://localhost:4200/graphql', formData);
     /* .subscribe(
      data => {
        console.log('data', data);
      },
      error => {
        console.log('error', error);
      }
    );*/
  }
}
