# Code design

Complete the following design with appropriate class and methods. You can use
any language you like, the example here is c++.
Assume a program that manages “intensity” by segments. Segments are
intervals from -infinity to infinity, we’d like you to implement functions that
updates intensity by an integer amount for a given range.
All intensity starts with 0. Please implement these three functions, you can also
add you own function.

```cpp
class IntensitySegments
{
    public:
    void add(int from, int to, int amount); // add intensity for the range
    void set(int from, int to, int amount); // set intensity for the range
    string toString(); // get the string of the summary
};
```

Example:

```cpp
IntensitySegments *is = new IntensitySegments();

cout << is->toString() << endl; // []

is->add(10, 30, 1);
cout << is->toString() << endl; // [[10,1],[30,0]]

is->add(20, 40, 1);
cout << is->toString() << endl; // [[10,1],[20,2],[30,1],[40,0]]

is->add(10, 40, -2);
cout << is->toString() << endl; // [[10,-1],[20,0],[30,-1],[40,0]]

is->set(20, 30, 1);
cout << is->toString() << endl; // [[10,-1],[20,1],[30,-1],[40,0]]
```

```cpp
IntensitySegments *is0 = new IntensitySegments();

is0->add(10, 30, 1);
cout << is0->toString() << endl; // [[10,1],[30,0]]

is0->add(20, 40, 1);
cout << is0->toString() << endl; // [[10,1],[20,2],[30,1],[40,0]]

is0->add(10, 40, -1);
cout << is0->toString() << endl; // [[20,1],[30,0]]

is0->add(10, 40, -1);
cout << is0->toString() << endl; // [[10,-1],[20,0],[30,-1],[40,0]]

is0->set(20, 30, 3);
cout << is0->toString() << endl; // [[10,-1],[20,3],[30,-1],[40,0]]
```

Comments:

- [[10,1],[30,0]], it means, from 10 to 29, the intensity is 1, start from 30, it is 0
- For result like [[10,1],[20,2],[30,2],[40,0]], the output would be [[10,1],[20,2],[40,0]], the segment with the same intensity should be combined.
- Another example: the original result is [[10,0],[20,1],[30,0],[40,0]], the final output would be [[20,1],[30,0]]
