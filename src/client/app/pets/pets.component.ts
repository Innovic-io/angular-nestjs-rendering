import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';

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

  constructor(private apollo: Apollo) {}

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

    const [ file ] = files;

    const variables = { files: file };

    console.log('send file', variables);
    this.result$ = this.apollo.mutate({
      variables: variables,
      mutation: UPLOAD_PROFILE_PICTURE,
    });
    console.log('result', this.result$);
  }
}

export const UPLOAD_PROFILE_PICTURE = gql`mutation uploadProfilePicture($files: [UploadedFile!]!) {
  uploadProfilePicture(files: $files, id: 0)
}`;
