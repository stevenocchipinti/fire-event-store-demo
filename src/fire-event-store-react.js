import React, { Component } from 'react'
import Firebase from 'firebase'
import 'firebase/firestore'
import { Broadcast, Subscriber } from 'react-broadcast'

export class FireEventStore extends Component {
  constructor(props) {
    super(props)
    this.state = props.reducer()
    Firebase.firestore().collection(props.firebaseKey).onSnapshot(snapshot => {
      const events = snapshot.docChanges.filter(c => c.type === 'added')
      console.time(`Reducing ${events.length} events`)
      this.setState(
        events
          .map(e => e.doc.data())
          .reduce(this.props.reducer, this.state)
      )
      console.timeEnd(`Reducing ${events.length} events`)
    })
  }

  eventEmitter() {
    return event => (
      Firebase.firestore().collection(this.props.firebaseKey).add({
        ...event,
        timestamp: Firebase.firestore.FieldValue.serverTimestamp()
      })
    )
  }

  render() {
    return (
      <Broadcast channel={this.props.stream} value={this.eventEmitter()}>
        {this.props.children(this.state)}
      </Broadcast>
    )
  }
}

export class EventEmitter extends Component {
  render() {
    const { stream, children } = this.props
    return (
      <Subscriber channel={stream}>
        {emit => children(emit)}
      </Subscriber>
    )
  }
}
