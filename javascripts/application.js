var regex = '(a+b)*';
var nfa = RegexParser.parse(regex); 
NFAVisualizer.visualize('#nfa', nfa);