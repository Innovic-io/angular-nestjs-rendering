import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  // tslint:disable
  private updateComment = gql`
    mutation createPet($name: String!) {
      createPet( name: $name, species: { speciesName: "dog", speciesFamily: "horse", speciesType: BIRD }, age: 8, owner: 0){ age, name, __typename }
    }
`;
  // tslint:enable

  result$: Observable<any>;

  constructor(private apollo: Apollo) { }

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

}
