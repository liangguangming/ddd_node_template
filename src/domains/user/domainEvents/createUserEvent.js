import IDomainEvent from '../../../core/IDomainEvent';

class CreateUserEvent extends IDomainEvent {
  constructor(data) {
    super();
    this.name = 'CREATE_USER';
    this.data = data;
  }
}

export default CreateUserEvent;
