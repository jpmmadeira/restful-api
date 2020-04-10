import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation failed' });
    }

    const userExists = await User.findOne({
      where: { email: request.body.email },
    });

    if (userExists) {
      return response
        .status(400)
        .json({ error: 'This e-mail is already registered' });
    }

    const { id, first_name, last_name, email } = await User.create(
      request.body
    );

    return response.json({
      user: {
        id,
        first_name,
        last_name,
        email,
      },
    });
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      first_name: Yup.string(),
      last_name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation failed' });
    }

    const { email, oldPassword } = request.body;

    const user = await User.findByPk(request.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return response
          .status(400)
          .json({ error: 'This e-mail is already registered' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return response.status(401).json({ error: 'Password does not match' });
    }

    const { id, first_name, last_name } = await user.update(request.body);

    return response.json({
      user: {
        id,
        first_name,
        last_name,
        email,
      },
    });
  }
}

export default new UserController();
