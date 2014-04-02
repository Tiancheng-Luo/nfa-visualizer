var regex = '(a+b)*+aba(ab+ab*+a)*';
var nfa = RegexParser.parse(regex);
NFAVisualizer.visualize('#nfa', nfa);

var states = [];
nfa.addEventListener('yield', function(e) {
  states.push(e.state);
});

var regex = 'ababaa';
console.log(nfa.accepts(regex));

step();
function step() {
  if (states.length) {
    var currentState = document.querySelector('circle.current');
    var currentLabel = document.querySelector('.labels p.current');
    if (currentState) {
      currentState.classList.remove('current');
      currentLabel.classList.remove('current');
    }

    var label = states.shift().label;
    var state = document.querySelector('circle[label="' + label + '"]');
    label = document.querySelector('.labels p[for="' + label + '"]');
    state.classList.add('current');
    label.classList.add('current');
    setTimeout(step, 1000);
  }
}